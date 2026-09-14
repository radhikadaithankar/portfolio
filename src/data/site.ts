/**
 * Single source of truth for everything factual on the site.
 * Edit here; the sections read from this file.
 *
 * Facts come from Radhika's resume; contact links were supplied separately.
 * Nothing here is embellished: if a detail is not in the resume it is not on the site.
 */

export const identity = {
  firstName: "Radhika",
  lastName: "Daithankar",
  fullName: "Radhika Daithankar",
  /** One plain sentence about what she does right now. */
  role: "Managing Director at CIS",
  headline: "AI engineer and technology leader. I run digital transformation for a school ecosystem in Pune and build the software behind it.",
  intro:
    "I have an MSc in Artificial Intelligence from Queen Mary University of London and a B.Tech in Computer Science. I have worked as a web developer, data analyst and data scientist, and I now lead technology at CIS, where I designed and shipped a school operations and parent engagement platform. On the side I am starting a technology company, Evaradh.",
  location: "Pune, India",
  currentRole: "Managing Director, CIS",
  since: "Since November 2025",
};

/** Short facts shown under the hero. */
export const facts = [
  { label: "Now", value: "Managing Director, CIS", note: "Pune · since Nov 2025" },
  { label: "Education", value: "MSc Artificial Intelligence", note: "Queen Mary University of London, 2023" },
  { label: "Focus", value: "AI, data and product", note: "From model training to shipped software" },
  { label: "Building", value: "Evaradh", note: "A technology company, early stage" },
];

/**
 * Portrait photographs. Drop real photos at these paths inside /public and the
 * site will use them automatically; until then an editorial placeholder is shown.
 */
export const portraits = {
  hero: "/images/portrait.jpg",
  founder: "/images/portrait-founder.jpg",
};

export const contact = {
  email: "radhikadaithankar@gmail.com",
  linkedin: "https://www.linkedin.com/in/radhika-daithankar-5411161b3",
  github: "https://github.com/radhikadaithankar",
};

export const nav = [
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "EVARADH", href: "#evaradh" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "Queen Mary University of London",
    place: "London, UK",
    period: "2022 — 2023",
    focus: "Machine learning, computer vision and robotics. Academic research on AI applications, and hands-on training of machine learning and deep learning models.",
  },
  {
    degree: "B.Tech Computer Science",
    school: "MGM's Jawaharlal Nehru Engineering College",
    place: "Aurangabad, India",
    period: "2017 — 2021",
    focus: "Data structures, algorithms, software engineering and databases. Tech events, group projects and a first stretch of leading a team.",
  },
];

export type Chapter = {
  number: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string[];
  tools: string[];
  motif: "layers" | "noise" | "arm" | "hand";
};

export const platform = {
  number: "01",
  kicker: "CIS · 2025 — present",
  title: "School Operations & Parent Engagement Platform",
  oneLine: "One platform that runs the daily operations of a school and keeps parents informed in real time.",
  problem:
    "A school's day is made of many separate workflows: attendance, fees, notices, homework, appointments, student records. In most schools each one lives in a different register, spreadsheet or WhatsApp group. Parents find out late, and teachers spend their day chasing information.",
  system:
    "I designed and led the build of a single centralised platform that covers these workflows end to end, with a separate experience for teachers, parents and operations staff. Each role sees only the parts of the school that are theirs.",
  workflows: [
    "Academic workflows",
    "Attendance",
    "Homework",
    "Assessments",
    "Behaviour tracking",
    "Leave",
    "Notices",
    "Fee management",
    "Student records",
    "Timetables",
    "Calendars",
    "Parent–teacher appointments",
    "Communication",
  ],
  facts: [
    {
      id: "qr",
      big: "15 SEC",
      label: "Dynamic QR attendance",
      text: "Attendance is marked by scanning a QR code that regenerates every fifteen seconds. A screenshot forwarded to a friend stops working within a quarter of a minute, so a scan proves the student was actually there.",
    },
    {
      id: "radius",
      big: "100 M",
      label: "Campus-radius restriction",
      text: "A scan is only accepted from inside a hundred-metre radius of the campus. The check is silent for the teacher taking the register and impossible to argue with for anyone outside the boundary.",
    },
    {
      id: "notify",
      big: "REAL TIME",
      label: "Parent notifications",
      text: "The moment attendance is submitted, the parent receives a notification. The same channel carries notices, fee reminders and appointment confirmations.",
    },
  ],
  appointments:
    "Teachers publish the slots when they are available; parents book one. This replaced unplanned visits at the school gate and interruptions in the middle of lessons with a scheduled conversation.",
  ai: "AI-powered attendance sits underneath: fewer manual registers, fewer gaps in the data, and no end-of-term surprises. Student management, fee collection and school-wide communication share the same data, so a change in one place shows up everywhere it should.",
  stack: ["Product design", "System design", "AI-powered attendance", "Role-based access", "Real-time notifications"],
};

export const experiments: Chapter[] = [
  {
    number: "02",
    kicker: "Deep learning",
    title: "Deep Neural Networks for Image Classification",
    summary: "Compared ResNet18 and VGG13 on MNIST to measure what residual connections add to a deep network.",
    detail: [
      "Implemented and trained both architectures in PyTorch on the same dataset, then compared accuracy, loss curves and confusion matrices.",
      "The useful result was not which network scored higher, but a clear picture of how residual connections change what a deeper network is able to learn.",
    ],
    tools: ["PyTorch", "ResNet18", "VGG13", "MNIST"],
    motif: "layers",
  },
  {
    number: "03",
    kicker: "Unsupervised learning",
    title: "Generative Adversarial Network",
    summary: "Built a basic GAN from the ground up to learn how generative and unsupervised models train.",
    detail: [
      "A generator that starts from random noise and a discriminator that learns to tell real samples from generated ones, trained against each other until the generated output becomes convincing.",
      "Written from scratch rather than from a library example, so every loss term and training step is one I understand.",
    ],
    tools: ["GANs", "Deep learning", "Unsupervised learning"],
    motif: "noise",
  },
  {
    number: "04",
    kicker: "Robotics",
    title: "Panda Robot Manipulator",
    summary: "A ROS package that moves a seven-axis Panda arm through Cartesian space and draws geometric shapes autonomously.",
    detail: [
      "Cartesian motion control for the end-effector, plus a planning routine that lets the arm draw a clean geometric figure without a human guiding each move.",
      "Kinematics and motion planning on a real manipulator model, not a simulation shortcut.",
    ],
    tools: ["ROS", "Panda manipulator", "Motion planning"],
    motif: "arm",
  },
  {
    number: "05",
    kicker: "Accessibility · Embedded ML",
    title: "Gesture-Controlled Wheelchair",
    summary: "An Arduino-based wheelchair that reads hand gestures, classifies them with a machine-learning model and turns them into movement.",
    detail: [
      "For a user who cannot operate a joystick, a small hand movement becomes a direction. Sensor input is read on the Arduino, classified by a trained model and mapped to motor commands.",
      "The first project where a model I trained moved something in the physical world.",
    ],
    tools: ["Arduino", "Machine learning", "Embedded systems"],
    motif: "hand",
  },
];

export const roles = [
  {
    title: "Managing Director",
    company: "CIS",
    period: "Nov 2025 — Present",
    line: "Leading organisational and technology initiatives for digital transformation across a school ecosystem: identifying operational problems, designing the solutions and driving them through to implementation. Designed and led the school operations and parent engagement platform above.",
    tags: ["Technology leadership", "Product", "Digital transformation"],
  },
  {
    title: "Data Science Intern",
    company: "The Developers Arena",
    period: "Mar 2025 — Sept 2025",
    line: "Delivered an end-to-end data science project from raw data to a deployed model. Built and evaluated regression models, random forests, CNNs and RNNs, and applied statistical testing before drawing conclusions.",
    tags: ["Python", "Deep learning", "Statistics"],
  },
  {
    title: "Data Analyst",
    company: "JSYSC Holdings Ltd.",
    period: "Apr 2024 — Jun 2025",
    line: "Analysed sales, point-of-sale and inventory data in Python, SQL and Excel. Forecast demand, informed staffing schedules and automated data cleaning and reporting so decisions were made on current numbers.",
    tags: ["SQL", "Forecasting", "Automation"],
  },
  {
    title: "Data Science Intern",
    company: "Unified Mentor Pvt. Ltd.",
    period: "Feb 2024 — Aug 2024",
    line: "Preprocessed and explored real-world datasets, tuned model hyperparameters and presented the results in Tableau and Matplotlib.",
    tags: ["Pandas", "Scikit-Learn", "Tableau"],
  },
  {
    title: "Web Developer",
    company: "Voran Services Pvt. Ltd.",
    period: "Feb 2021 — Feb 2022",
    line: "Built responsive websites in Bootstrap and cross-platform mobile apps in Flutter for client projects.",
    tags: ["Flutter", "Bootstrap", "HTML/CSS"],
  },
];

export const toolbox = [
  {
    name: "LANGUAGES",
    hint: "Python, SQL and the web",
    items: ["Python", "SQL", "HTML", "CSS", "Flutter", "Bootstrap", "Software development"],
  },
  {
    name: "MACHINE LEARNING",
    hint: "Training and evaluating models",
    items: ["Machine Learning", "Deep Learning", "Computer Vision", "PyTorch", "Scikit-Learn"],
  },
  {
    name: "DATA",
    hint: "Analysis, forecasting, reporting",
    items: ["NumPy", "Pandas", "SciPy", "Tableau", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    name: "PRODUCT",
    hint: "Deciding what to build",
    items: ["Product thinking", "AI product development", "Data-driven decision making", "Problem solving"],
  },
  {
    name: "SYSTEMS",
    hint: "Robotics, automation, platforms",
    items: ["ROS", "Automation", "Digital transformation", "Linux · Windows · macOS"],
  },
];

export const evaradh = {
  name: "EVARADH",
  what: "Evaradh is a technology company I am building. Its purpose is to create multiple products that solve real-world problems.",
  stage: "Early stage. There is no product to announce yet, and this page does not pretend otherwise. It is a long-term, company-building effort rather than a single launch.",
  approach: [
    { step: "01", title: "Start from a real problem", text: "Something a specific group of people deals with every day, not a technology looking for a use." },
    { step: "02", title: "Build a small working version", text: "A working version in front of the people who have the problem, before any polish." },
    { step: "03", title: "Keep what works", text: "Ideas that hold up become products. Products that hold up may become companies of their own." },
  ],
  status: [
    { label: "Founder", value: "Radhika Daithankar" },
    { label: "Stage", value: "Pre-product" },
    { label: "Focus", value: "Multiple products for real-world problems" },
  ],
};

export const about = {
  title: "ABOUT",
  paragraphs: [
    "I am Radhika Daithankar, an AI engineer and technology leader based in Pune, India. I studied computer science at MGM's Jawaharlal Nehru Engineering College in Aurangabad, then completed an MSc in Artificial Intelligence at Queen Mary University of London, where I worked on machine learning, computer vision and robotics.",
    "Professionally I started as a web developer, moved into data analytics and data science across three roles, and since November 2025 I have been Managing Director at CIS, leading digital transformation for a school ecosystem. The school operations and parent engagement platform on this page is the main product of that work.",
    "I am most useful at the point where a real operational problem meets a technical decision: understanding the problem well enough to design the right system, then building it and getting it adopted.",
  ],
  interests: ["AI products", "Education technology", "Operations automation", "Data-driven decisions", "Robotics"],
};

export const contactCopy = {
  title: ["GET IN", "TOUCH."],
  line: "Open to conversations about AI products, education technology and early-stage company building. Email is the fastest way to reach me.",
};
