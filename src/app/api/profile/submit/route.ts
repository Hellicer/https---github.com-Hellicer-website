import { NextResponse } from 'next/server'
import type { ProfileSubmissionPayload, ProfileSubmissionResult } from '@/types/profile'
import { createClient } from '@supabase/supabase-js'

const PROFILE_UPLOADS_BUCKET =
    process.env.SUPABASE_PROFILE_UPLOADS_BUCKET || 'profile-uploads'
const MAX_PHOTO_SIZE_BYTES = 1024 * 1024

function sanitizeFileName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function normalizePayload(value: unknown): ProfileSubmissionPayload | null {
    if (!value || typeof value !== 'object') {
        return null
    }

    const record = value as Record<string, unknown>
    const mainInfo = record.mainInfo as Record<string, unknown> | undefined
    const skills = record.skills
    const techStack = record.techStack

    if (!mainInfo || typeof mainInfo !== 'object') {
        return null
    }

    const ageRaw = mainInfo.age
    const age =
        typeof ageRaw === 'number'
            ? ageRaw
            : typeof ageRaw === 'string' && ageRaw.trim() !== ''
              ? Number(ageRaw)
              : undefined

    if (
        typeof mainInfo.name !== 'string' ||
        typeof mainInfo.position !== 'string' ||
        typeof mainInfo.sex !== 'string' ||
        (age !== undefined && !Number.isFinite(age)) ||
        !Array.isArray(skills) ||
        !skills.every(item => typeof item === 'string') ||
        !Array.isArray(techStack) ||
        !techStack.every(item => typeof item === 'string')
    ) {
        return null
    }

    return {
        mainInfo: {
            name: mainInfo.name.trim(),
            position: mainInfo.position.trim(),
            sex: mainInfo.sex.trim(),
            age: age !== undefined ? Math.min(91, Math.max(14, age)) : undefined,
        },
        skills: skills.map(item => item.trim()).filter(Boolean),
        techStack: techStack.map(item => item.trim()).filter(Boolean),
    }
}

function validateSubmissionPayload(payload: ProfileSubmissionPayload): string | null {
    if (!payload.mainInfo.name.trim()) {
        return 'Name is required.'
    }

    if (!payload.mainInfo.position.trim()) {
        return 'Position is required.'
    }

    if (payload.mainInfo.age === undefined || !Number.isFinite(payload.mainInfo.age)) {
        return 'Age is required.'
    }

    if (payload.mainInfo.age < 14 || payload.mainInfo.age > 91) {
        return 'Age must be between 14 and 91.'
    }

    if (payload.techStack.length < 2) {
        return 'At least 2 technologies are required.'
    }

    const skillsTextLength = payload.skills.join(' ').trim().length
    if (skillsTextLength < 50) {
        return 'Skills must contain at least 50 characters.'
    }

    return null
}

async function createProfileGist(params: {
    submissionId: string
    payload: ProfileSubmissionPayload
    photoUrl: string | null
    cvUrl: string | null
}) {
    const token = process.env.GITHUB_TOKEN
    const username = process.env.GITHUB_USERNAME ?? 'unknown'

    if (!token) {
        throw new Error('GITHUB_TOKEN is not configured.')
    }

    const gistPayload = {
        description: `statgist profile submission ${params.submissionId}`,
        public: true,
        files: {
            [`statgist-${params.submissionId}.json`]: {
                content: JSON.stringify(
                    {
                        mainInfo: {
                            name: params.payload.mainInfo.name,
                            position: params.payload.mainInfo.position,
                            sex: params.payload.mainInfo.sex,
                            age: params.payload.mainInfo.age,
                            photo: params.photoUrl ?? undefined,
                        },
                        skills: params.payload.skills.join('. '),
                        techStack: params.payload.techStack,
                        projects: {
                            'open source': 0,
                            startups: 0,
                            freelance: 0,
                            corporate: 0,
                        },
                        otherInfo: {
                            skillsChart: {
                                architecture: 6,
                                coding: 6,
                                performance: 6,
                                consistency: 6,
                                communication: 6,
                            },
                        },
                        stats: {
                            wakatime: 0,
                        },
                        links: {
                            linkedin: '#',
                            github: `https://github.com/${username}`,
                            cv: params.cvUrl ?? undefined,
                        },
                    },
                    null,
                    2,
                ),
            },
        },
    }

    const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify(gistPayload),
        cache: 'no-store',
    })

    if (!response.ok) {
        const details = await response.text()
        throw new Error(
            `Failed to create gist (${response.status}): ${details}`,
        )
    }

    const gist = (await response.json()) as { id?: string; html_url?: string }
    if (!gist.id || !gist.html_url) {
        throw new Error('GitHub returned invalid gist response.')
    }

    return { gistId: gist.id, gistUrl: gist.html_url }
}

export async function POST(request: Request) {
    const formData = await request.formData()
    const payloadRaw = formData.get('payload')

    if (typeof payloadRaw !== 'string') {
        return NextResponse.json(
            { ok: false, reason: 'Missing payload.' },
            { status: 400 },
        )
    }

    let parsed: unknown
    try {
        parsed = JSON.parse(payloadRaw)
    } catch {
        return NextResponse.json(
            { ok: false, reason: 'Invalid payload JSON.' },
            { status: 400 },
        )
    }

    const payload = normalizePayload(parsed)
    if (!payload) {
        return NextResponse.json(
            { ok: false, reason: 'Payload schema mismatch.' },
            { status: 400 },
        )
    }

    const validationError = validateSubmissionPayload(payload)
    if (validationError) {
        return NextResponse.json(
            { ok: false, reason: validationError },
            { status: 400 },
        )
    }

    const photoFile = formData.get('photo')
    const cvFile = formData.get('cv')

    if (photoFile instanceof File && photoFile.size > MAX_PHOTO_SIZE_BYTES) {
        return NextResponse.json(
            { ok: false, reason: 'Photo must be up to 1 MB.' },
            { status: 400 },
        )
    }

    const submissionId = crypto.randomUUID()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
        return NextResponse.json(
            {
                ok: false,
                reason:
                    'Supabase server credentials are not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.',
            },
            { status: 500 },
        )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const ensureBucketExists = async () => {
        const { data: buckets, error: listError } =
            await supabase.storage.listBuckets()

        if (listError) {
            throw new Error(`Failed to list buckets: ${listError.message}`)
        }

        const exists = buckets?.some(
            bucket => bucket.name === PROFILE_UPLOADS_BUCKET,
        )

        if (exists) {
            return
        }

        const { error: createError } = await supabase.storage.createBucket(
            PROFILE_UPLOADS_BUCKET,
            {
                public: false,
                fileSizeLimit: '20MB',
            },
        )

        if (createError && !createError.message.includes('already exists')) {
            throw new Error(
                `Failed to create bucket "${PROFILE_UPLOADS_BUCKET}": ${createError.message}`,
            )
        }
    }

    const uploadAndGetPublicUrl = async (
        file: File,
        folder: 'photo' | 'cv',
    ): Promise<string | null> => {
        if (file.size === 0) {
            return null
        }

        const fileName = sanitizeFileName(file.name)
        const objectPath = `profile/${submissionId}/${folder}/${fileName}`
        const arrayBuffer = await file.arrayBuffer()
        const fileBytes = new Uint8Array(arrayBuffer)

        const uploadFile = async () =>
            supabase.storage.from(PROFILE_UPLOADS_BUCKET).upload(objectPath, fileBytes, {
                contentType: file.type || undefined,
                upsert: true,
            })

        let { error: uploadError } = await uploadFile()

        if (uploadError?.message.includes('Bucket not found')) {
            await ensureBucketExists()
            const retry = await uploadFile()
            uploadError = retry.error
        }

        if (uploadError) {
            throw new Error(
                `Failed to upload ${folder}: ${uploadError.message}`,
            )
        }

        const { data } = supabase.storage
            .from(PROFILE_UPLOADS_BUCKET)
            .getPublicUrl(objectPath)

        const { data: signedData, error: signedError } = await supabase.storage
            .from(PROFILE_UPLOADS_BUCKET)
            .createSignedUrl(objectPath, 60 * 60 * 24 * 7)

        if (!signedError && signedData?.signedUrl) {
            return signedData.signedUrl
        }

        return data.publicUrl
    }

    let photoUrl: string | null = null
    let cvUrl: string | null = null
    let gistId = ''
    let gistUrl = ''

    try {
        if (photoFile instanceof File) {
            photoUrl = await uploadAndGetPublicUrl(photoFile, 'photo')
        }

        if (cvFile instanceof File) {
            cvUrl = await uploadAndGetPublicUrl(cvFile, 'cv')
        }

        const gistResult = await createProfileGist({
            submissionId,
            payload,
            photoUrl,
            cvUrl,
        })

        gistId = gistResult.gistId
        gistUrl = gistResult.gistUrl
    } catch (error) {
        return NextResponse.json(
            {
                ok: false,
                reason:
                    error instanceof Error
                        ? error.message
                        : 'File upload failed.',
            },
            { status: 500 },
        )
    }

    const response: ProfileSubmissionResult = {
        ok: true,
        submissionId,
        photoUrl,
        cvUrl,
        gistId,
        gistUrl,
        createdAt: new Date().toISOString(),
    }

    return NextResponse.json(response, { status: 200 })
}
