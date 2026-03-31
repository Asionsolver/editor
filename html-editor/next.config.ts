import os from "node:os";

// Auto-detect all local network IPs (changes every WiFi restart)

function getLocalNetworkIPs() {
  const interfaces = os.networkInterfaces();

  const ips = [];

  for (const nets of Object.values(interfaces)) {
    for (const net of nets ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  return ips;
}

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {},

  allowedDevOrigins: getLocalNetworkIPs(),

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
