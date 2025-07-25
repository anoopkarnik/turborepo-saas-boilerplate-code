/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:["puppeteer-core","@sparticuz/chromium"],
    },
    reactStrictMode: true,
    swcMinify: true,
    images:{
        remotePatterns: [
            {hostname: '0mckiahhlguhefmi.public.blob.vercel-storage.com', protocol:'https'},
            {hostname: 'strapi.bayesian-labs.com', protocol:'https'},
            {hostname: 'oaidalleapiprodscus.blob.core.windows.net', protocol:'https'},
            {hostname: 'photo.100xdevs.com', protocol:'https'},
            {hostname: 'r2-us-west.photoai.com', protocol:'https'},
            {hostname: 'lh3.googleusercontent.com', protocol:'https'},

        ],
        unoptimized: true,
    },
    webpack(config) {
        const path = require('path');
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
    },
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

module.exports = nextConfig;
