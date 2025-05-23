/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
    },

    //  eslint: {
    //     // ✅ Prevents ESLint errors from breaking production builds
    //     ignoreDuringBuilds: true,
    // },
    
};

export default nextConfig;
