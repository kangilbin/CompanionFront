/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination:
          "https://port-0-companionback-1b5xkk2fldd606lq.gksl2.cloudtype.app/:path*",
        // destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
