/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { 
                protocol: "https",
                hostname: "marvelous-lobster-162.convex.cloud" 
            },
        ],
    },
};

export default nextConfig;
