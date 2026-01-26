import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

if (process.env.NODE_ENV === "development") {
  await initOpenNextCloudflareForDev();
}

export default nextConfig;
