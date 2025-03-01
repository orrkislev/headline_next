/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';


const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,

};
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig);
