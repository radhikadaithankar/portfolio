import { company, contact, identity, positioning, school } from "@/data/site";
import { projects, type Project } from "@/data/projects";

export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://radhikakd.com",
).origin;
export const absoluteUrl = (path: string) =>
  new URL(path, `${siteOrigin}/`).href;
export const siteTitle = "Radhika Daithankar | AI Engineer & Evaradh Founder";
export const siteDescription = positioning.description;
export const socialImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `Radhika Daithankar. ${positioning.statement}`,
};

const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");
const evaradhId = `${company.url}#organization`;
const schoolId = `${school.url}#organization`;

export function profileStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: identity.fullName,
        url: absoluteUrl("/"),
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: absoluteUrl("/"),
        name: siteTitle,
        description: siteDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: identity.fullName,
        givenName: identity.firstName,
        familyName: identity.lastName,
        url: absoluteUrl("/"),
        description: siteDescription,
        jobTitle: [
          "AI engineer",
          "Founder of Evaradh",
          "Managing Director at CIS",
        ],
        homeLocation: { "@type": "Place", name: identity.location },
        sameAs: [contact.linkedin, contact.github],
        worksFor: [{ "@id": evaradhId }, { "@id": schoolId }],
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Queen Mary University of London",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "MGM's Jawaharlal Nehru Engineering College",
          },
        ],
        knowsAbout: [
          "Artificial intelligence",
          "Machine learning",
          "Software development",
          "Robotics",
        ],
      },
      {
        "@type": "Organization",
        "@id": evaradhId,
        name: company.name,
        url: company.url,
        description: company.description,
        founder: { "@id": personId },
      },
      {
        "@type": "School",
        "@id": schoolId,
        name: school.name,
        alternateName: school.shortName,
        url: school.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Parbhani",
          addressCountry: "IN",
        },
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/#projects"),
        name: "Selected projects by Radhika Daithankar",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.shortTitle,
          url: absoluteUrl(`/work/${project.slug}`),
        })),
      },
    ],
  };
}

export function projectStructuredData(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `${project.shortTitle} | ${identity.fullName}`,
        description: project.summary,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${url}#project` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.shortTitle,
        url,
        description: `${project.summary} ${project.contribution}`,
        creator: {
          "@type": "Person",
          "@id": personId,
          name: identity.fullName,
          url: absoluteUrl("/"),
        },
        keywords: project.tools,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Radhika Daithankar",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.shortTitle,
            item: url,
          },
        ],
      },
    ],
  };
}
