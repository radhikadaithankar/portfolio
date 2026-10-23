import { company, contact, education, identity, school, toolkit } from "./site";

/**
 * Short, factual answers for search and answer engines. Every answer is built
 * from facts already published on this site; do not add unverified claims.
 */
export const faq = [
  {
    question: `Who is ${identity.fullName}?`,
    answer: `${identity.fullName} is an AI engineer based in ${identity.location}. ${identity.firstName} founded ${company.name}, a technology product company, and is Managing Director at ${school.name} (${school.shortName}) in Parbhani. ${identity.firstName} holds an ${education[0].degree} from ${education[0].school}.`,
  },
  {
    question: "What is CIS Compass?",
    answer: `CIS Compass is the school management app ${identity.firstName} built for ${school.name}, with an AI assistant for teachers. Teachers, parents and staff each get their own view of attendance, homework, fees and notices. It is built with Flutter, a TypeScript and Node.js API on PostgreSQL, Firebase notifications and Google's Gemini API.`,
  },
  {
    question: `What is ${company.name}?`,
    answer: `${company.name} is a technology product company founded by ${identity.fullName}. Its first product is ${company.firstProduct}. Schools interested in Compass or a custom build can get in touch through ${company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}.`,
  },
  {
    question: `What technologies does ${identity.firstName} work with?`,
    answer: toolkit
      .map((set) => `${set.group}: ${set.items.join(", ")}.`)
      .join(" "),
  },
  {
    question: `Where did ${identity.firstName} study?`,
    answer: education
      .map(
        (item) =>
          `${item.degree} at ${item.school}, ${item.place} (${item.period.replace(/\s*—\s*/, " to ")}).`,
      )
      .join(" "),
  },
  {
    question: `How can I contact or hire ${identity.firstName}?`,
    answer: `Email ${contact.email}, view the CV at cv.radhikakd.com, or connect on LinkedIn. For school software or a custom build, contact ${company.name}.`,
  },
];
