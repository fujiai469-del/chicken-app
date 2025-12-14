import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // エラーがあっても無視してビルドする設定
    ignoreBuildErrors: true,
  },
  eslint: {
    // チェックを無視する設定
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;