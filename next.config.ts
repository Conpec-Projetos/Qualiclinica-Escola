import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/qualiclinica-escola.firebasestorage.app/o/images**",
      },
    ]
  },
};

export default nextConfig;
