import { company, contact, identity, school } from "./site";

/**
 * Short, factual answers for search and answer engines. Each question covers
 * something the rest of the homepage does not already say, and every answer
 * is built from facts already published on this site; do not add unverified
 * claims.
 */
export const faq = [
  {
    question: `What does ${identity.fullName} do?`,
    answer: `${identity.firstName} is an AI engineer in ${identity.location} who builds products end to end, from machine learning models to the apps people use every day. ${identity.firstName} runs ${company.name}, a technology product company, and leads technology at ${school.name}.`,
  },
  {
    question: "How does the AI assistant in CIS Compass help students?",
    answer:
      "It is designed to encourage learning rather than hand over answers. When a student asks for help with homework, it first asks them to try the problem themselves. If they are stuck, it asks to see their attempt and then offers a hint to help them continue. For teachers, it adapts explanations to the class they teach, so the same topic is explained differently for Class 2 and Class 10.",
  },
  {
    question: "Can my school use CIS Compass?",
    answer: `CIS Compass is ${company.name}'s first product. Schools that want Compass, or a custom build for their own workflows, can get in touch through ${company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}.`,
  },
  {
    question: `What roles is ${identity.firstName} open to?`,
    answer: `AI and data roles, including machine learning, data science and AI product engineering. The quickest way to start a conversation is by email at ${contact.email}, and the full CV is at cv.radhikakd.com.`,
  },
  {
    question: `Where can I see ${identity.firstName}'s code?`,
    answer: `On GitHub at ${contact.github.replace(/^https?:\/\//, "")}, including the public notebooks for the generative adversarial network, regression and Gaussian mixture projects.`,
  },
];
