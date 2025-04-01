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
        ],
        unoptimized: true,
    },
};

module.exports = nextConfig;
