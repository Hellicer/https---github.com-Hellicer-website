const createNextIntPlugin = require('next-intl/plugin')
import type { NextConfig } from 'next'

const withNextIntl = createNextIntPlugin()

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [new URL('https://cdn.simpleicons.org/**')],
    },
}

export default withNextIntl(nextConfig)
