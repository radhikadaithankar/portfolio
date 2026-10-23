/** Identity and career facts checked against the supplied CV. Project content lives in projects.ts. */

export const identity = {
  firstName: "Radhika",
  lastName: "Daithankar",
  fullName: "Radhika Daithankar",
  discipline: "AI engineer",
  headline: "AI engineer · Managing Director, CIS",
  location: "Pune, India",
  currentRole: "Managing Director, CIS",
};

export const contact = {
  email: "radhikadaithankar@gmail.com",
  linkedin: "https://www.linkedin.com/in/radhika-daithankar-5411161b3",
  github: "https://github.com/radhikadaithankar",
};

// Lead with the builder and a product already in use. Contact offers a route
// for hiring teams and a separate route for schools and Evaradh clients.
export const positioning = {
  statement: "AI engineer building software that schools actually use.",
  supporting:
    "From a school app with an AI assistant for teachers to a robot arm that draws on its own. I trained in artificial intelligence at Queen Mary University of London, sharpened it with data work in London, and now build products through Evaradh.",
  intro: { lead: "I turn everyday problems into", accent: "working software." },
  tagline: "Ideas, made useful.",
  description:
    "Radhika Daithankar is an AI engineer and Evaradh founder who built CIS Compass, a school management app with teacher AI support, in use at Chintamani International School.",
};

export const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "Queen Mary University of London",
    place: "London, UK",
    period: "2022 — 2023",
  },
  {
    degree: "B.Tech Computer Science",
    school: "MGM's Jawaharlal Nehru Engineering College",
    place: "Aurangabad, India",
    period: "2017 — 2021",
  },
];

/** Skills already evidenced in the roles and projects on this site. Add a tool only with a role or project behind it. */
export const toolkit = [
  {
    group: "Machine learning",
    items: [
      "PyTorch",
      "CNNs (ResNet, VGG)",
      "GANs",
      "Random Forest",
      "Gaussian mixtures",
      "Demand forecasting",
    ],
  },
  {
    group: "Data & analysis",
    items: [
      "Python",
      "SQL",
      "NumPy",
      "Pandas",
      "Excel",
      "Tableau",
      "Matplotlib",
    ],
  },
  {
    group: "Building",
    items: [
      "Flutter",
      "TypeScript",
      "Node.js & Express",
      "React",
      "PostgreSQL & Prisma",
      "Firebase",
      "Gemini API",
      "ROS",
      "Arduino",
    ],
  },
];

export type Role = {
  id?: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  contribution: string;
  highlights: string[];
  tags: string[];
  impact?: string;
};

export const roles: Role[] = [
  {
    title: "Managing Director",
    company: "CIS",
    location: "Parbhani, India",
    period: "Nov 2025 – Present",
    current: true,
    contribution:
      "Leading the school's technology initiatives and turning day-to-day operational needs into working products.",
    highlights: [
      "Delivered the school's public website and its management app, with workflows for staff, teachers and parents covering attendance, student records, notifications and appointment booking.",
      "Identified operational problems and drove digital solutions into everyday use across the school.",
    ],
    tags: ["Leadership", "Product"],
  },
  {
    title: "Data Science Intern",
    company: "The Developers Arena",
    period: "Mar — Sept 2025",
    contribution:
      "Worked through the machine learning lifecycle, from preparing datasets to deploying a model.",
    highlights: [
      "Cleaned and transformed data with Python, NumPy and Pandas, then used exploratory analysis and statistical tests to investigate patterns.",
      "Built and evaluated regression, Random Forest and convolutional neural network models, completing an end-to-end ML project through deployment.",
    ],
    tags: ["Python", "Deep learning"],
  },
  {
    id: "experience-yori",
    // TODO(yori-impact): Add measured reporting hours saved or forecast accuracy,
    // with the baseline, time period and method. Leave empty until verified.
    impact: undefined,
    title: "Data Analyst",
    company: "JSYSC Holdings Ltd. · YORI",
    location: "London, UK",
    period: "Apr 2024 — Jun 2025",
    contribution:
      "Built a data-analysis project to make my own work at YORI easier, using sales, point-of-sale and inventory data.",
    highlights: [
      "Analysed purchasing and inventory patterns with Python, SQL and Excel, and applied demand forecasting to support stock and staffing decisions.",
      "Automated data cleaning and reporting to reduce repetitive manual work and make business insights easier to use.",
      "Started at YORI as a waitress, then progressed to team leader and supervisor.",
    ],
    tags: ["SQL", "Forecasting"],
  },
  {
    title: "Data Science Intern",
    company: "Unified Mentor Pvt. Ltd.",
    period: "Feb — Aug 2024",
    contribution:
      "Prepared real-world datasets for analysis and communicated findings through models and visualisations.",
    highlights: [
      "Handled missing and inconsistent data, performed exploratory analysis and tuned machine learning models through hyperparameter adjustments.",
      "Created Tableau and Matplotlib visualisations to explain results and share findings with the team.",
    ],
    tags: ["Pandas", "Tableau"],
  },
  {
    title: "Web Developer",
    company: "Voran Services Pvt. Ltd.",
    period: "Feb 2021 — Feb 2022",
    contribution:
      "Built interfaces for the web and contributed to mobile application development.",
    highlights: [
      "Developed responsive websites using Bootstrap and modern frontend technologies, adapting layouts for different screen sizes.",
      "Worked on cross-platform mobile applications using Flutter.",
    ],
    tags: ["Flutter", "Bootstrap"],
  },
];

/** Company positioning and product status checked against evaradh.com on 28 September 2026. */
export const company = {
  name: "Evaradh",
  url: "https://evaradh.com/",
  description: "A technology product company",
  firstProduct: "CIS Compass",
};

export const school = {
  name: "Chintamani International School",
  shortName: "CIS",
  url: "https://chintamani-school.org/",
  location: "Parbhani, India",
};
