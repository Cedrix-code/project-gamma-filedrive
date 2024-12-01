/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "marvelous-lobster-162.convex.cloud" },
        ],
    },
};

export default nextConfig;
