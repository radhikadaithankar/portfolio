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
  headline: "AI engineer · Managing Director, CIS",
  location: "Pune, India",
  currentRole: "Managing Director, CIS",
};

export const facts = [
  { label: "Now", value: "MD, CIS", note: "Nov 2025 —" },
  { label: "Education", value: "MSc AI", note: "Queen Mary, 2023" },
  { label: "Focus", value: "AI & product" },
  { label: "Building", value: "Evaradh" },
];

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
  },
  {
    degree: "B.Tech Computer Science",
    school: "MGM's Jawaharlal Nehru Engineering College",
    place: "Aurangabad, India",
    period: "2017 — 2021",
  },
];

export type Chapter = {
  number: string;
  title: string;
  kicker: string;
  summary: string;
  tools: string[];
  motif: "layers" | "noise" | "arm" | "hand";
};

export const platform = {
  number: "01",
  kicker: "CIS · 2025 —",
  title: "School Operations Platform",
  oneLine: "One system for attendance, fees, notices, homework and parent communication.",
  workflows: [
    "Attendance",
    "Homework",
    "Assessments",
    "Behaviour",
    "Leave",
    "Notices",
    "Fees",
    "Student records",
    "Timetables",
    "Calendars",
    "Appointments",
    "Communication",
  ],
  facts: [
    {
      id: "qr",
      big: "15 SEC",
      label: "Dynamic QR",
      text: "Attendance QR regenerates every 15 seconds. A screenshot is useless.",
    },
    {
      id: "radius",
      big: "100 M",
      label: "Campus radius",
      text: "Scans only work inside 100 metres of campus.",
    },
    {
      id: "notify",
      big: "LIVE",
      label: "Parent alerts",
      text: "Parents are notified the moment attendance is marked.",
    },
  ],
  stack: ["Product", "System design", "AI attendance"],
};

export const experiments: Chapter[] = [
  {
    number: "02",
    kicker: "Deep learning",
    title: "Image Classification",
    summary: "ResNet18 vs VGG13 on MNIST, in PyTorch.",
    tools: ["PyTorch", "ResNet18", "VGG13", "MNIST"],
    motif: "layers",
  },
  {
    number: "03",
    kicker: "Unsupervised",
    title: "GAN",
    summary: "A generator and discriminator trained from scratch.",
    tools: ["GANs", "Deep learning"],
    motif: "noise",
  },
  {
    number: "04",
    kicker: "Robotics",
    title: "Panda Manipulator",
    summary: "ROS package: Cartesian motion and autonomous drawing.",
    tools: ["ROS", "Motion planning"],
    motif: "arm",
  },
  {
    number: "05",
    kicker: "Embedded ML",
    title: "Gesture Wheelchair",
    summary: "Arduino wheelchair driven by a gesture classifier.",
    tools: ["Arduino", "Machine learning"],
    motif: "hand",
  },
];

export const roles = [
  {
    title: "Managing Director",
    company: "CIS",
    period: "Nov 2025 —",
    tags: ["Leadership", "Product"],
  },
  {
    title: "Data Science Intern",
    company: "The Developers Arena",
    period: "Mar — Sept 2025",
    tags: ["Python", "Deep learning"],
  },
  {
    title: "Data Analyst",
    company: "JSYSC Holdings Ltd.",
    period: "Apr 2024 — Jun 2025",
    tags: ["SQL", "Forecasting"],
  },
  {
    title: "Data Science Intern",
    company: "Unified Mentor Pvt. Ltd.",
    period: "Feb — Aug 2024",
    tags: ["Pandas", "Tableau"],
  },
  {
    title: "Web Developer",
    company: "Voran Services Pvt. Ltd.",
    period: "Feb 2021 — Feb 2022",
    tags: ["Flutter", "Bootstrap"],
  },
];

export const toolbox = [
  {
    name: "LANGUAGES",
    items: ["Python", "SQL", "HTML", "CSS", "Flutter", "Bootstrap"],
  },
  {
    name: "ML",
    items: ["Machine Learning", "Deep Learning", "Computer Vision", "PyTorch", "Scikit-Learn"],
  },
  {
    name: "DATA",
    items: ["NumPy", "Pandas", "SciPy", "Tableau", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    name: "PRODUCT",
    items: ["Product thinking", "AI products", "Problem solving"],
  },
  {
    name: "SYSTEMS",
    items: ["ROS", "Automation", "Linux · Windows · macOS"],
  },
];

export const evaradh = {
  name: "EVARADH",
  line: "A technology company in progress. Pre-product. Building software for real-world problems.",
  status: [
    { label: "Founder", value: "Radhika Daithankar" },
    { label: "Stage", value: "Pre-product" },
    { label: "Focus", value: "Multiple products" },
  ],
};

export const about = {
  line: "Computer science in Aurangabad, MSc AI at Queen Mary, then data and product work. Since Nov 2025 I lead technology at CIS in Pune.",
  interests: ["AI products", "EdTech", "Automation", "Robotics"],
};
