/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "api.multiavatar.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/collections",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
