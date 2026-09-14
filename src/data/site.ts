/**
 * Single source of truth for everything factual on the site.
 * Edit here; the sections read from this file.
 *
 * Facts come from Radhika's resume; contact links were supplied separately.
 */

export const identity = {
  firstName: "Radhika",
  lastName: "Daithankar",
  fullName: "Radhika Daithankar",
  statement: ["I BUILD WHAT", "I WISH", "EXISTED."],
  disciplines: ["AI", "PRODUCT", "TECHNOLOGY", "ENTREPRENEURSHIP"],
  supportingLine:
    "A technology builder exploring the space between ideas, products and the problems worth solving.",
  currentRole: "Managing Director, CIS",
  location: "Pune, India",
};

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
  { label: "STORY", href: "#story" },
  { label: "EVARADH", href: "#evaradh" },
  { label: "THINK", href: "#think" },
  { label: "CONTACT", href: "#contact" },
];

export const worlds = [
  "COMPUTER SCIENCE",
  "ARTIFICIAL INTELLIGENCE",
  "DATA",
  "SOFTWARE",
  "PRODUCTS",
  "LEADERSHIP",
  "ENTREPRENEURSHIP",
];

export const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "Queen Mary University of London",
    place: "London, UK",
    period: "2022 — 2023",
    focus: "Machine learning, computer vision, robotics. Academic research on AI applications; hands-on training of machine learning and deep learning algorithms.",
  },
  {
    degree: "B.Tech Computer Science",
    school: "MGM's Jawaharlal Nehru Engineering College",
    place: "Aurangabad, India",
    period: "2017 — 2021",
    focus: "Data structures, algorithms, software engineering, databases. Tech events and group projects, and the first taste of leading a team.",
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
  kicker: "The main thing",
  title: "School Operations & Parent Engagement Platform",
  problem:
    "A school runs on a hundred small workflows that were never designed to talk to each other. Attendance in one register, fees in another, notices on a board, appointments in a diary, homework in a bag. Parents hear about most of it too late, and teachers spend their day being interrupted by it.",
  system:
    "So I built the place where it all meets: one centralised platform for the daily life of a school, with a different experience for each person inside it. Teachers, parents and operations staff each see the version of the school that is theirs.",
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
      text: "Each attendance code lives for fifteen seconds and then it is gone. A screenshot is useless within a quarter of a minute. Presence becomes something you have to actually be present for.",
    },
    {
      id: "radius",
      big: "100 M",
      label: "Campus-radius restriction",
      text: "Attendance can only be submitted inside a hundred-metre radius of the campus. The boundary is invisible to the teacher taking the register and unarguable to the system behind it.",
    },
    {
      id: "notify",
      big: "REAL TIME",
      label: "Parent notifications",
      text: "The moment attendance is submitted, a parent knows. Not at the end of the term. Not in a letter in a school bag. Now.",
    },
  ],
  appointments:
    "Teachers publish when they are free. Parents book a designated slot. Fewer classroom interruptions, fewer unplanned visits at the gate, and a conversation that both sides arrived prepared for.",
  ai: "Underneath, AI-powered attendance capabilities make the whole thing quieter to run: fewer manual registers, fewer gaps, fewer conversations that start with “did you know…”. Student management, fee collection and school-wide communication live in the same place.",
};

export const experiments: Chapter[] = [
  {
    number: "02",
    kicker: "Deep learning",
    title: "Deep Neural Networks for Image Classification",
    summary: "ResNet18 against VGG13, on MNIST. A study in what depth actually buys you.",
    detail: [
      "Two architectures, one small and stubborn dataset. The question was never which network wins; it was understanding why residual connections change what a network is able to learn, and how each approach behaves when asked to recognise an image.",
      "Training curves, confusion matrices, the slow satisfaction of watching loss fall.",
    ],
    tools: ["PyTorch", "ResNet18", "VGG13", "MNIST"],
    motif: "layers",
  },
  {
    number: "03",
    kicker: "Unsupervised learning",
    title: "Unsupervised Learning with GANs",
    summary: "Teaching two networks to argue until one of them learns to invent.",
    detail: [
      "A basic GAN, implemented from the ground up to understand generative and unsupervised learning: a generator that starts by producing noise and a discriminator that refuses to be fooled, both improving because the other one is.",
      "The moment the noise starts to look like something is still one of my favourite feelings in machine learning.",
    ],
    tools: ["GANs", "Deep learning", "Unsupervised learning"],
    motif: "noise",
  },
  {
    number: "04",
    kicker: "Robotics",
    title: "Panda Robot Manipulator",
    summary: "A ROS package that moves a seven-axis arm through Cartesian space and lets it draw on its own.",
    detail: [
      "Getting a robot arm to move where you tell it in Cartesian space is one problem. Getting the end-effector to autonomously draw a clean geometric shape is a very different one.",
      "Kinematics, planning, and the humbling discovery that a straight line is hard.",
    ],
    tools: ["ROS", "Panda manipulator", "Motion planning"],
    motif: "arm",
  },
  {
    number: "05",
    kicker: "Accessibility",
    title: "Gesture-Controlled Wheelchair",
    summary: "Arduino, machine learning and embedded systems, so that a hand movement can become a direction.",
    detail: [
      "For someone who cannot use a joystick, a small gesture can be the difference between waiting and going. This Arduino-based wheelchair read hand gestures, classified them with a learned model, and turned them into motion.",
      "It was the first time a model I trained moved something in the physical world.",
    ],
    tools: ["Arduino", "Machine learning", "Embedded systems"],
    motif: "hand",
  },
];

export const notebook = {
  title: "THINGS I'M THINKING ABOUT.",
  statement: "Some ideas become experiments. Some experiments become products.",
  themes: [
    { word: "AI", note: "What does it change for the person on the other side of the screen?" },
    { word: "PRODUCTS", note: "Why do the useful ones feel so obvious afterwards?" },
    { word: "EDUCATION", note: "A school is a system. Most of it is invisible to parents." },
    { word: "AUTOMATION", note: "Which repetitive things quietly steal a person's day?" },
    { word: "DATA", note: "Numbers are answers to questions someone forgot to ask." },
    { word: "HUMAN PROBLEMS", note: "The interesting ones are rarely technical at the root." },
    { word: "STARTUPS", note: "A company is a promise to keep solving a problem." },
    { word: "BUILDING", note: "The fastest way I know to understand anything." },
  ],
};

export const disciplines = [
  {
    index: "I",
    name: "Web Development",
    line: "Where it started. Responsive websites, then Flutter apps: an idea becomes a screen becomes a thing other people can use.",
    gave: "Shipping",
  },
  {
    index: "II",
    name: "Data Science",
    line: "Then the questions changed. Cleaning real-world datasets, exploratory analysis, models tuned until they told the truth.",
    gave: "Rigour",
  },
  {
    index: "III",
    name: "Data Analytics",
    line: "Sales, point-of-sale and inventory data turned into forecasts, staffing schedules and decisions someone could act on.",
    gave: "Judgement",
  },
  {
    index: "IV",
    name: "Artificial Intelligence",
    line: "Machine learning, computer vision, robotics. Systems that learn, see and move, and a master's degree spent finding out how.",
    gave: "Depth",
  },
  {
    index: "V",
    name: "Technology & Product Leadership",
    line: "Deciding what to build, for whom, and why it should exist at all. Then making sure it gets implemented.",
    gave: "Direction",
  },
];

export const roles = [
  {
    title: "Managing Director",
    company: "CIS",
    period: "Nov 2025 — Present",
    tool: "Ownership",
    line: "Leading organisational and technology initiatives around digital transformation for a school ecosystem. Finding the problems, designing the solutions, and driving them all the way to implementation. This is where the platform lives.",
  },
  {
    title: "Data Science Intern",
    company: "The Developers Arena",
    period: "Mar 2025 — Sept 2025",
    tool: "Experimentation",
    line: "An end-to-end project from raw data to a deployed model. Regression, random forests, CNNs and RNNs, and the discipline of statistical testing before believing anything.",
  },
  {
    title: "Data Analyst",
    company: "JSYSC Holdings Ltd.",
    period: "Apr 2024 — Jun 2025",
    tool: "Clarity",
    line: "Sales, point-of-sale and inventory data in Python, SQL and Excel. Forecasting demand, shaping staffing schedules, and automating the cleaning and reporting so the insight arrived before the decision did.",
  },
  {
    title: "Data Science Intern",
    company: "Unified Mentor Pvt. Ltd.",
    period: "Feb 2024 — Aug 2024",
    tool: "Method",
    line: "Real-world datasets, preprocessed and explored. Models tuned hyperparameter by hyperparameter, then made visible in Tableau and Matplotlib.",
  },
  {
    title: "Web Developer",
    company: "Voran Services Pvt. Ltd.",
    period: "Feb 2021 — Feb 2022",
    tool: "Making",
    line: "The beginning. Responsive websites in Bootstrap and cross-platform mobile apps in Flutter, written for someone else to open the next morning.",
  },
];

export const toolbox = [
  {
    name: "THINK",
    hint: "Before anything is built",
    items: ["Problem solving", "Product thinking", "AI product development", "Data-driven decision making"],
  },
  {
    name: "BUILD",
    hint: "Turning it into something real",
    items: ["Python", "SQL", "HTML", "CSS", "Flutter", "Bootstrap", "Software development"],
  },
  {
    name: "INTELLIGENCE",
    hint: "Systems that learn",
    items: ["Machine Learning", "Deep Learning", "Computer Vision", "PyTorch", "Scikit-Learn"],
  },
  {
    name: "DATA",
    hint: "Finding out what is true",
    items: ["NumPy", "Pandas", "SciPy", "Tableau", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    name: "SYSTEMS",
    hint: "Making things run without you",
    items: ["ROS", "Automation", "Digital transformation", "Linux · Windows · macOS"],
  },
];

export const shift = [
  "BUT I'M NOT DONE.",
  "THERE ARE TOO MANY INTERESTING PROBLEMS.",
  "SO I'M BUILDING SOMETHING OF MY OWN.",
];

export const evaradh = {
  name: "EVARADH",
  vision:
    "Evaradh is being built as a technology company focused on creating multiple products that solve real-world problems.",
  philosophy: ["FIND PROBLEMS.", "BUILD USEFUL THINGS.", "KEEP BUILDING."],
  belief:
    "Technology is not the destination. The product is, and the product exists because the problem matters.",
  sequence: ["PROBLEM", "QUESTION", "IDEA", "EXPERIMENT", "PRODUCT", "COMPANY", "EVARADH"],
  manifesto: [
    "We don't want to build technology simply because technology is possible.",
    "We want to build because a problem is worth solving.",
    "Some ideas will disappear.",
    "Some will become experiments.",
    "Some will become products.",
    "And perhaps, some will become companies.",
  ],
  closing: "THIS IS THE BEGINNING.",
  note: "Evaradh is a long-term, company-building journey. There is no product to announce yet, and this page will not pretend otherwise.",
};

export const founder = {
  title: "THE WOMAN BEHIND THE WORK.",
  story: [
    "It began with computer science in Aurangabad: the pleasure of a thing that either works or doesn't, and the patience to find out why.",
    "Then artificial intelligence, at Queen Mary University of London: machine learning, computer vision, robotics. Systems that could learn something she had not explicitly told them.",
    "Work took her across data, software and product development, and then into technology leadership, where the interesting question stopped being how to build and became what deserves to be built.",
  ],
  movement: ["Learning technology", "Using technology", "Building products", "Thinking about companies"],
};

export const principles = [
  "I START WITH THE PROBLEM.",
  "I LEARN BY BUILDING.",
  "I LIKE UNDERSTANDING HOW THINGS WORK.",
  "AI IS A TOOL. THE PRODUCT IS THE OUTCOME.",
  "GOOD TECHNOLOGY SHOULD FEEL SIMPLE.",
];

export const finale = {
  question: "WHAT'S NEXT?",
  list: ["More ideas.", "More experiments.", "More products."],
  maybe: "MAYBE A COMPANY.",
  name: "EVARADH",
  invitation: "Let's build something worth building.",
};
