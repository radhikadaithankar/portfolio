import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Build time stands in for the last change, since the site is static. */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified, priority: 1 },
    ...projects.map(({ slug }) => ({
      url: absoluteUrl(`/work/${slug}`),
      lastModified,
      priority: slug === "school-platform" ? 0.9 : 0.7,
    })),
  ];
}
