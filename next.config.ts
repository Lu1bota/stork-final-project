import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ftp.goit.study", "res.cloudinary.com"],
  },

  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

export default nextConfig;
