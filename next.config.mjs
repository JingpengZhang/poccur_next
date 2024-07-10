/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s21.ax1x.com",
      },
    ],
  },
};

export default nextConfig;
