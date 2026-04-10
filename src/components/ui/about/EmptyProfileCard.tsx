'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { TitleBar } from './TitleBar'
import { useTranslations } from 'next-intl'
import { ChevronDown, FileText, ImagePlus } from 'lucide-react'
import { TECH_NAMES as techNames } from '@/data/techNames'
import { SkillTiles } from './SkillTiles'
import type {
    ProfileSubmissionPayload,
    ProfileSubmissionResult,
} from '@/types/profile'

type EmptyProfileCardProps = {
    onCancel?: () => void
}

const MAX_PHOTO_SIZE_BYTES = 1024 * 1024

export function EmptyProfileCard({ onCancel }: EmptyProfileCardProps = {}) {
    const t = useTranslations()
    const [mainInfoDraft, setMainInfoDraft] = useState({
        name: '',
        position: '',
        age: '',
        sex: '',
    })
    const [skillsDraft, setSkillsDraft] = useState('')
    const [techSearch, setTechSearch] = useState('')
    const [isTechMenuOpen, setIsTechMenuOpen] = useState(false)
    const [activeTechIndex, setActiveTechIndex] = useState(0)
    const [customTech, setCustomTech] = useState('')
    const [selectedTech, setSelectedTech] = useState<string[]>([])
    const techSearchRef = useRef<HTMLDivElement | null>(null)
    const cvInputRef = useRef<HTMLInputElement | null>(null)
    const photoInputRef = useRef<HTMLInputElement | null>(null)
    const [isCvDragActive, setIsCvDragActive] = useState(false)
    const [cvFileName, setCvFileName] = useState('')
    const [isPhotoDragActive, setIsPhotoDragActive] = useState(false)
    const [photoFileName, setPhotoFileName] = useState('')
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState('')
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [submitResult, setSubmitResult] =
        useState<ProfileSubmissionResult | null>(null)
    const [photoError, setPhotoError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const normalizedSearch = techSearch.trim().toLowerCase()
    const filteredTechOptions = techNames
        .filter(option => !selectedTech.includes(option))
        .filter(option => option.toLowerCase().includes(normalizedSearch))
        .sort((a, b) => {
            const aStarts = a.toLowerCase().startsWith(normalizedSearch)
            const bStarts = b.toLowerCase().startsWith(normalizedSearch)
            if (aStarts && !bStarts) return -1
            if (!aStarts && bStarts) return 1
            return a.localeCompare(b)
        })
    const visibleTechOptions = filteredTechOptions.slice(0, 6)

    useEffect(() => {
        const onPointerDown = (event: MouseEvent) => {
            if (!techSearchRef.current) {
                return
            }
            if (!techSearchRef.current.contains(event.target as Node)) {
                setIsTechMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', onPointerDown)
        return () => document.removeEventListener('mousedown', onPointerDown)
    }, [])

    const addTech = (rawValue: string) => {
        const value = rawValue.trim()
        if (value.length === 0 || selectedTech.includes(value)) {
            return
        }
        setSelectedTech(prev => [...prev, value])
        setCustomTech('')
        setTechSearch('')
        setIsTechMenuOpen(false)
        setActiveTechIndex(0)
    }

    const handleCvFiles = (files: FileList | null) => {
        if (!files || files.length === 0) {
            return
        }
        const file = files[0]
        setCvFileName(file.name)
        setCvFile(file)
    }

    const handlePhotoFiles = (files: FileList | null) => {
        if (!files || files.length === 0) {
            return
        }

        const file = files[0]
        if (!file.type.startsWith('image/')) {
            setPhotoError('Please upload an image file.')
            return
        }

        if (file.size > MAX_PHOTO_SIZE_BYTES) {
            setPhotoError('Photo must be up to 1 MB.')
            return
        }
        setPhotoError(null)

        const nextUrl = URL.createObjectURL(file)
        setPhotoPreviewUrl(prev => {
            if (prev) {
                URL.revokeObjectURL(prev)
            }
            return nextUrl
        })
        setPhotoFileName(file.name)
        setPhotoFile(file)
    }

    const handleSubmit = async () => {
        const name = mainInfoDraft.name.trim()
        const position = mainInfoDraft.position.trim()
        const ageRaw = mainInfoDraft.age.trim()
        const age = Number(ageRaw)
        const skillsLength = skillsDraft.trim().length

        if (!name || !position || !ageRaw) {
            setSubmitError('Name, position and age are required.')
            return
        }

        if (!Number.isFinite(age) || age < 14 || age > 91) {
            setSubmitError('Age must be between 14 and 91.')
            return
        }

        if (selectedTech.length < 2) {
            setSubmitError('Add at least 2 technologies in tech stack.')
            return
        }

        if (skillsLength < 50) {
            setSubmitError('Skills must contain at least 50 characters.')
            return
        }

        if (photoFile && photoFile.size > MAX_PHOTO_SIZE_BYTES) {
            setSubmitError('Photo must be up to 1 MB.')
            return
        }

        setIsSubmitting(true)
        setSubmitError(null)
        setSubmitResult(null)

        const payload: ProfileSubmissionPayload = {
            mainInfo: {
                name,
                position,
                sex: mainInfoDraft.sex.trim(),
                age,
            },
            skills: skillsDraft
                .split('\n')
                .map(item => item.trim())
                .filter(Boolean),
            techStack: selectedTech,
        }

        try {
            const formData = new FormData()
            formData.set('payload', JSON.stringify(payload))
            if (photoFile) {
                formData.set('photo', photoFile)
            }
            if (cvFile) {
                formData.set('cv', cvFile)
            }

            const response = await fetch('/api/profile/submit', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit profile form.')
            }

            const result = (await response.json()) as ProfileSubmissionResult
            setSubmitResult(result)
            setSuccessMessage('вашу вакансія була відправлена, дякую!')
            setTimeout(() => {
                window.location.reload()
            }, 1200)
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'Unknown submit error.',
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        return () => {
            if (photoPreviewUrl) {
                URL.revokeObjectURL(photoPreviewUrl)
            }
        }
    }, [photoPreviewUrl])

    return (
        <div className="grid min-h-[860px] min-w-0 gap-6 rounded-2xl bg-card p-4 text-sm transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 min-[581px]:min-h-[954px]">
            <div className="grid min-w-0 gap-6 min-[581px]:grid-cols-[minmax(0,1fr)_auto]">
                <div className="order-1 min-w-0 font-inter text-base font-semibold min-[581px]:col-start-1 min-[581px]:row-start-1">
                    <TitleBar title="main info" />
                    <div className="pt-3">
                        <div className="grid gap-2">
                            {(['name', 'position', 'age', 'sex'] as const).map(
                                key => (
                                    <label
                                        key={key}
                                        className="grid grid-cols-[90px_205px] items-center gap-2 font-inter text-base font-semibold"
                                    >
                                        <span className=" capitalize text-chart-1">
                                            &gt; {key}:{' '}
                                        </span>
                                        <Input
                                            type={
                                                key === 'age'
                                                    ? 'number'
                                                    : 'text'
                                            }
                                            min={key === 'age' ? 14 : undefined}
                                            max={key === 'age' ? 91 : undefined}
                                            step={key === 'age' ? 1 : undefined}
                                            value={mainInfoDraft[key]}
                                            onChange={e =>
                                                setMainInfoDraft(prev => {
                                                    if (key !== 'age') {
                                                        return {
                                                            ...prev,
                                                            [key]: e.target
                                                                .value,
                                                        }
                                                    }

                                                    if (e.target.value === '') {
                                                        return {
                                                            ...prev,
                                                            age: '',
                                                        }
                                                    }

                                                    const nextAge = Math.min(
                                                        91,
                                                        Math.max(
                                                            14,
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        ),
                                                    )

                                                    return {
                                                        ...prev,
                                                        age: Number.isNaN(
                                                            nextAge,
                                                        )
                                                            ? prev.age
                                                            : String(nextAge),
                                                    }
                                                })
                                            }
                                            className={`h-8 border-0 border-b border-ring/40 rounded-none bg-card/70 px-2 py-1 focus-visible:ring-0`}
                                        />
                                    </label>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="order-2 grid min-w-0 content-start gap-4 min-[581px]:col-start-2 min-[581px]:row-start-1 min-[581px]:grid-cols-1">
                    <div
                        className={`group relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed transition-colors max-[580px]:h-48 max-[580px]:w-full min-[581px]:h-50 min-[581px]:w-50 ${
                            isPhotoDragActive
                                ? 'border-ring bg-accent/70'
                                : 'border-ring/40 bg-gray-500/30'
                        }`}
                        onClick={() => photoInputRef.current?.click()}
                        onDragOver={e => {
                            e.preventDefault()
                            setIsPhotoDragActive(true)
                        }}
                        onDragLeave={() => setIsPhotoDragActive(false)}
                        onDrop={e => {
                            e.preventDefault()
                            setIsPhotoDragActive(false)
                            handlePhotoFiles(e.dataTransfer.files)
                        }}
                    >
                        <input
                            ref={photoInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handlePhotoFiles(e.target.files)}
                        />
                        {photoPreviewUrl ? (
                            <img
                                src={photoPreviewUrl}
                                alt={photoFileName || t('profileCard.photo')}
                                className="h-full w-full rounded-xl object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <div className="grid place-items-center gap-2 text-center text-xs text-muted-foreground">
                                <ImagePlus className="h-5 w-5 text-white/80" />
                                <span>Drop photo</span>
                            </div>
                        )}
                    </div>
                    {photoError && (
                        <p className="text-xs text-destructive">{photoError}</p>
                    )}
                    {photoPreviewUrl && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => photoInputRef.current?.click()}
                        >
                            Change photo
                        </Button>
                    )}
                </div>
                <div className="order-4 min-[581px]:col-span-2 min-[581px]:row-start-3">
                    <div
                        className={`flex cursor-pointer items-center justify-between rounded-md border border-dashed p-3 transition-colors ${
                            isCvDragActive
                                ? 'border-ring bg-accent/70'
                                : 'border-ring/40 bg-card/40'
                        }`}
                        onClick={() => cvInputRef.current?.click()}
                        onDragOver={e => {
                            e.preventDefault()
                            setIsCvDragActive(true)
                        }}
                        onDragLeave={() => setIsCvDragActive(false)}
                        onDrop={e => {
                            e.preventDefault()
                            setIsCvDragActive(false)
                            handleCvFiles(e.dataTransfer.files)
                        }}
                    >
                        <input
                            ref={cvInputRef}
                            type="file"
                            accept=".txt,.md,.rtf,.pdf,.doc,.docx"
                            className="hidden"
                            onChange={e => handleCvFiles(e.target.files)}
                        />
                        <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-white/80" />
                            <span className="text-muted-foreground">
                                {t('common.upload') ||
                                    'Drop resume file or click to upload'}
                            </span>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                            {cvFileName ||
                                t('profileCard.uploadCv') ||
                                'Upload CV'}
                        </Button>
                    </div>
                </div>

                <div className="order-5 min-[581px]:col-span-2 min-[581px]:row-start-4">
                    <TitleBar title="skills" />
                    <div className="pt-3">
                        <Textarea
                            value={skillsDraft}
                            onChange={e => setSkillsDraft(e.target.value)}
                            maxLength={300}
                            placeholder="Fill skills..."
                            className="min-h-30 w-full resize-none rounded-lg border border-ring/40 bg-card/70 p-3 text-sm font-medium"
                        />
                        <p className="pt-1 text-right text-xs text-muted-foreground">
                            {skillsDraft.length}/300
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="pb-2.5">
                    <TitleBar title="tech stack" />
                </div>
                <div className="grid gap-3">
                    <div className="relative" ref={techSearchRef}>
                        <Input
                            type="text"
                            placeholder="Search technology..."
                            value={techSearch}
                            onFocus={() => setIsTechMenuOpen(true)}
                            onChange={e => {
                                setTechSearch(e.target.value)
                                setIsTechMenuOpen(true)
                                setActiveTechIndex(0)
                            }}
                            onKeyDown={e => {
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault()
                                    if (visibleTechOptions.length > 0) {
                                        setIsTechMenuOpen(true)
                                        setActiveTechIndex(prev =>
                                            Math.min(
                                                prev + 1,
                                                visibleTechOptions.length - 1,
                                            ),
                                        )
                                    }
                                    return
                                }

                                if (e.key === 'ArrowUp') {
                                    e.preventDefault()
                                    setActiveTechIndex(prev =>
                                        Math.max(prev - 1, 0),
                                    )
                                    return
                                }

                                if (e.key === 'Escape') {
                                    setIsTechMenuOpen(false)
                                    return
                                }

                                if (e.key !== 'Enter') {
                                    return
                                }
                                e.preventDefault()
                                if (visibleTechOptions.length > 0) {
                                    addTech(visibleTechOptions[activeTechIndex])
                                    return
                                }
                                addTech(techSearch)
                            }}
                            className="bg-card/70 pr-8 font-medium"
                        />
                        <ChevronDown
                            className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform ${isTechMenuOpen ? 'rotate-180' : ''}`}
                        />

                        {isTechMenuOpen && visibleTechOptions.length > 0 && (
                            <div className="search-dropdown-scroll absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-ring/40 bg-card p-2 shadow-lg">
                                <div className="grid gap-2">
                                    {visibleTechOptions.map((option, index) => (
                                        <Button
                                            key={option}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className={`justify-start text-left ${index === activeTechIndex ? '' : ''}`}
                                            onMouseEnter={() =>
                                                setActiveTechIndex(index)
                                            }
                                            onMouseDown={e =>
                                                e.preventDefault()
                                            }
                                            onClick={() => addTech(option)}
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-[1fr_auto] gap-2">
                        <Input
                            type="text"
                            value={customTech}
                            onChange={e => setCustomTech(e.target.value)}
                            placeholder="Add custom technology..."
                            onKeyDown={e => {
                                if (e.key !== 'Enter') {
                                    return
                                }
                                e.preventDefault()
                                addTech(customTech)
                            }}
                            className="bg-card/70 "
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            className="font-normal cursor-pointer"
                            onClick={() => addTech(customTech)}
                        >
                            +
                        </Button>
                    </div>

                    <SkillTiles
                        techStack={selectedTech.map(name => ({ name }))}
                        fixedHeight={false}
                        showOverflowIndicator={false}
                        onRemove={name =>
                            setSelectedTech(prev =>
                                prev.filter(item => item !== name),
                            )
                        }
                    />
                </div>
            </div>

            {/* <div className="grid min-w-0 grid-cols-1 gap-6">
                <div className="grid grid-flow-row">
                    <TitleBar title="Other Info" />
                </div>
            </div> */}

            <div className="flex items-center justify-end gap-2 self-end">
                <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="font-silkscreen text-2xl cursor-pointer"
                    onClick={() => {
                        if (onCancel) {
                            onCancel()
                            return
                        }
                        setMainInfoDraft({
                            name: '',
                            position: '',
                            age: '',
                            sex: '',
                        })
                        setSkillsDraft('')
                        setSelectedTech([])
                        setCvFileName('')
                        setCvFile(null)
                        setPhotoFileName('')
                        setPhotoFile(null)
                        setSubmitError(null)
                        setSubmitResult(null)
                    }}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="font-silkscreen text-2xl cursor-pointer"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('common.loading') : t('common.submit')}
                </Button>
            </div>
            {(submitError || submitResult || successMessage) && (
                <div className="rounded-md border border-ring/40 bg-card/40 p-3 text-xs">
                    {submitError && (
                        <p className="text-destructive">{submitError}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-400 font-semibold">
                            {successMessage}
                        </p>
                    )}
                    {submitResult && (
                        <div className="grid gap-1 text-muted-foreground">
                            <p>Submitted: {submitResult.submissionId}</p>
                            <p>Photo URL: {submitResult.photoUrl ?? 'not provided'}</p>
                            <p>CV URL: {submitResult.cvUrl ?? 'not provided'}</p>
                            <p>Gist ID: {submitResult.gistId}</p>
                            <p>
                                Gist URL:{' '}
                                <a
                                    href={submitResult.gistUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline text-chart-1"
                                >
                                    {submitResult.gistUrl}
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
