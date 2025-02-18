/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['flagcdn.com', 'www.google.com'],
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};
export default nextConfig;
