import { company, contact, education, identity, school, toolkit } from "./site";

/**
 * Short, factual answers for search and answer engines. Every answer is built
 * from facts already published on this site; do not add unverified claims.
 */
export const faq = [
  {
    question: `Who is ${identity.fullName}?`,
    answer: `${identity.fullName} is an AI engineer based in ${identity.location}. ${identity.firstName} founded ${company.name}, a technology product company, and is Managing Director at ${school.name} (${school.shortName}) in Parbhani, where ${identity.firstName} built the CIS Compass school management app. ${identity.firstName} holds an ${education[0].degree} from ${education[0].school}.`,
  },
  {
    question: "What is CIS Compass?",
    answer: `CIS Compass is a school management app with an AI assistant for teachers, built independently by ${identity.firstName} and developed under ${company.name}. It is in use at ${school.name}. Teachers, parents and operations staff each get their own view, covering attendance, fees, homework, notices, student records and appointment booking. The AI assistant helps teachers take attendance and post homework, adapts explanations to the class level, and gives students hints after they try a problem themselves.`,
  },
  {
    question: "How is CIS Compass built?",
    answer:
      "The teacher and parent apps are written in Flutter for Android and iOS. A TypeScript, Node.js and Express API with Prisma and PostgreSQL serves them and a React admin dashboard. Firebase Cloud Messaging delivers notifications, and the AI assistant runs on Google's Gemini API.",
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

/**
 * The home page shows only the two questions the rest of the page does not
 * already answer. The full list still feeds llms.txt.
 */
const homeQuestions = [
  `How can I contact or hire ${identity.firstName}?`,
  `What technologies does ${identity.firstName} work with?`,
];
export const homeFaq = homeQuestions.map(
  (question) => faq.find((item) => item.question === question)!,
);
