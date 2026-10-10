import type { NextConfig } from "next";

// Old URLs from the previous site keep working.
const moved = ["cyclogic", "google-companion", "kaikaku-fusion", "dinosaurdle", "viapak", "bloombums"];
const archived = ["hive-fu", "pulsar", "fea-hip-prosthetic", "cfd-corvette"];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      ...moved.map((slug) => ({
        source: `/projects/${slug}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      ...archived.map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/#archive",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
