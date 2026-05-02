/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.facebook.com https://web.facebook.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;