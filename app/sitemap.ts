import type { MetadataRoute } from "next";
import { ROOM_TYPES } from "@/lib/rooms";

const BASE_URL = "https://sunoneroom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/shared-facilities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/personal-facilities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/location`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const roomRoutes: MetadataRoute.Sitemap = ROOM_TYPES.map((room) => ({
    url: `${BASE_URL}/rooms/${room.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...roomRoutes];
}
