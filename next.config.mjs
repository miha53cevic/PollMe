/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false, // useSearchParams needs to be used in Suspense otherwise
    },
};

export default nextConfig;
