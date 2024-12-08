import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
   images: {
    domains : ["img.freepik.com" , "encrypted-tbn0.gstatic.com" ,  "lh3.googleusercontent.com"]
  }
};

export default nextConfig;
