/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Images: prefer WebP/AVIF, smaller sizes for mobile
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 86400, // cache optimized images for 24h
    },

    // Compiler: remove console.log in production
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
            ? { exclude: ['error', 'warn'] }
            : false,
    },

    // Enable gzip compression for faster transfers
    compress: true,

    // Reduce build output noise; don't suppress real errors anymore
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },

    // Properly handle walletconnect dependencies on the server
    experimental: {
        serverComponentsExternalPackages: ['pino', 'pino-pretty'],
    },

    // Fix WalletConnect / RainbowKit bundle compilation issues
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
            crypto: false,
            'pino-pretty': false,
            '@react-native-async-storage/async-storage': false,
            encoding: false,
        };
        return config;
    },
};

module.exports = nextConfig;
