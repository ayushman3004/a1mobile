import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/aboutus",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/return-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/returns",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/refund",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/shipping-policy",
        destination: "/shipping",
        permanent: true,
      },
      {
        source: "/delivery",
        destination: "/shipping",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/help",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/account/login",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/account/register",
        permanent: true,
      },
      {
        source: "/sell",
        destination: "/sell-old-device",
        permanent: true,
      },
      {
        source: "/buyback",
        destination: "/sell-old-device",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
