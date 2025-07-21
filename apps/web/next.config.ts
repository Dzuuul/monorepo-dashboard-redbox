import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."), // pastikan absolute path
  },
  /* config options here */
};

export default nextConfig;
