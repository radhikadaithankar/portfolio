import { notebooks, projects } from "@/data/projects";
import { faq } from "@/data/faq";
import {
  company,
  contact,
  education,
  identity,
  positioning,
  roles,
  school,
  toolkit,
} from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * A plain-text summary for AI assistants (https://llmstxt.org), generated
 * from the same data as the pages so the two never disagree.
 */
export function GET() {
  const lines = [
    `# ${identity.fullName}`,
    "",
    `> ${positioning.description}`,
    "",
    `${identity.fullName} is an ${identity.discipline} based in ${identity.location}, founder of ${company.name} and Managing Director at ${school.name} (${school.shortName}).`,
    "",
    "## Key pages",
    `- [Portfolio](${absoluteUrl("/")}): projects, experience, capabilities and story`,
    ...projects.map(
      (project) =>
        `- [${project.shortTitle}](${absoluteUrl(`/work/${project.slug}`)}): ${project.summary}`,
    ),
    "- [Web CV](https://cv.radhikakd.com/): experience, education, projects and skills",
    "",
    "## Experience",
    ...roles.map(
      (role) =>
        `- ${role.title}, ${role.company}${role.location ? `, ${role.location}` : ""} (${role.period}): ${role.contribution}`,
    ),
    "",
    "## Education",
    ...education.map(
      (item) =>
        `- ${item.degree}, ${item.school}, ${item.place} (${item.period})`,
    ),
    "",
    "## Skills",
    ...toolkit.map((set) => `- ${set.group}: ${set.items.join(", ")}`),
    "",
    "## Notebooks",
    ...notebooks.map(
      (notebook) =>
        `- [${notebook.title}](${notebook.url}): ${notebook.description}`,
    ),
    "",
    "## Questions and answers",
    ...faq.flatMap((item) => [`### ${item.question}`, item.answer, ""]),
    "## Contact",
    `- Email: ${contact.email}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- GitHub: ${contact.github}`,
    `- ${company.name}: ${company.url}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
