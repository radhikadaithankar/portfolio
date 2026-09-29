import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map(({ slug }) => `/work/${slug}`)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
