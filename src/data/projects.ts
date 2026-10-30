export type ProjectMedia = {
  type: "video" | "gif";
  src: string;
  poster: string;
  alt: string;
  caption?: string;
  /** A tall phone recording, shown in a phone-shaped frame. */
  portrait?: boolean;
};

export type ProjectDetail = { title: string; text: string };

export type SchoolCaseStudy = {
  oneLiner?: string;
  problem?: string;
  aiAssistant?: ProjectDetail[];
  results?: string;
  measurableResult?: string;
  privacyAndSafety?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: "Product" | "AI & ML" | "Robotics";
  discipline: string;
  summary: string;
  contribution: string;
  question: string;
  approach: string;
  context?: string;
  year?: string;
  resultLine?: string;
  media?: ProjectMedia;
  collection: "Featured" | "Academic experiments";
  caseStudy?: SchoolCaseStudy;
  scope: string[];
  delivery: { title: string; text: string };
  repository?: string;
  details: ProjectDetail[];
  tools: string[];
  visual: "school" | "networks" | "gan" | "robot" | "gesture";
};

// Project facts were checked against Radhika's supplied CV. On 28 September
// 2026, she confirmed sole authorship of all five projects, including both
// the CIS website and management app. This describes project work, not
// sole ownership of her employers' wider products or business outcomes.
// Public references: https://chintamani-school.org/digital-school and https://evaradh.com/.
// Diagrams explain concepts; they are not model outputs or benchmark results.
// TODO(project-years): Add each project's confirmed year when available.
// Omitted years and result lines stay hidden. Keep TODOs in comments, never copy.
export const projects: Project[] = [
  {
    slug: "school-platform",
    number: "01",
    title: "CIS Compass",
    shortTitle: "CIS Compass",
    collection: "Featured",
    category: "Product",
    discipline: "School operations · Parent engagement",
    summary:
      "The school website and CIS Compass, Evaradh's school management app, with AI support for teacher tasks and class-level explanations.",
    contribution:
      "I independently built the school website and CIS Compass, including the role-based workflows, attendance, parent notifications and appointment booking.",
    question:
      "How do you bring daily school operations and parent communication into the same system?",
    approach:
      "I designed and built two things. The public website is where families considering the school first meet it, with a clear route into admissions. CIS Compass is the working system behind each day: teachers mark attendance and set homework from their phones, parents hear about both as soon as they are recorded, the office keeps fees and notices in one dashboard, and parent–teacher meetings are booked into slots that teachers publish. Parents, teachers and office staff each get their own view of the same records.",
    context: "Production · Evaradh / CIS, Parbhani",
    resultLine:
      "In daily use at Chintamani International School: 290 students, 359 parents and 28 teachers.",
    caseStudy: {
      oneLiner:
        "One app for the whole school day at Chintamani International School: attendance, homework, fees, notices and meetings for parents, teachers and office staff, with an AI assistant built in.",
      // Paragraphs are separated by a blank line. The "before" picture was
      // confirmed by Radhika on 30 October 2026.
      problem: [
        "At Chintamani, the school day ran on paper and phone calls. Attendance lived in registers, so a family often learned about an absence only later. Notices and homework went out through WhatsApp groups and printed circulars, where they were easy to miss or lose under other messages. Fees were recorded in registers and spreadsheets, and the office followed up on payments by phone.",
        "A parent who wanted an update had two choices: ring the office or a teacher, or come to the school in person. Those visits were rarely planned, so they often arrived in the middle of a lesson, pulling a teacher out of class and interrupting the whole room.",
        "Conversations with families and staff showed what this cost each side. Parents felt out of the loop on attendance, homework and progress unless they went looking for it. Teachers were spending too much of their day on registers, messages and paperwork, and too little of it teaching.",
        "That set the brief: give every role one place for the information it needs, send updates to parents without them having to ask, take routine admin off teachers, and give meetings a booked slot instead of an unplanned visit.",
      ].join("\n\n"),
      aiAssistant: [
        {
          title: "An assistant for everyday teaching tasks",
          text: "The AI assistant helps teachers take attendance and post homework within CIS Compass, bringing those tasks into the same conversation as their teaching questions.",
        },
        {
          title: "Explanations that match the class",
          text: "Teachers can ask syllabus-related questions and specify the class they are teaching. A request to explain photosynthesis to Class 2 receives different content from the same request for Class 10, with the explanation adapted to the class level.",
        },
        {
          title: "Hints after an attempt",
          text: "For student homework requests, the assistant is designed to encourage learning rather than supply completed answers. It asks students to try the problem themselves first. If they are stuck, it asks them to show their attempt, then offers a hint to help them continue.",
        },
      ],
      results:
        "The website and CIS Compass are both live, and CIS Compass is the first product Evaradh has shipped. Registers, circulars and update calls now have a place in the app.",
      // Counted from the CIS Compass production database on 29 October 2026
      // (read-only totals; no individual records).
      measurableResult:
        "From 20 July to 29 October 2026, teachers recorded 7,162 attendance marks across 59 school days, and the app sent 18,038 notifications to 359 parent accounts covering 290 students in 20 classes.",
      // Checked against the CIS Compass code and its privacy policy on
      // 31 October 2026 (ai.routes.ts, ai/audit.ts, ai/quota.ts, legalPages.ts).
      privacyAndSafety: [
        "Only signed-in teachers, parents and office staff can use the assistant, and it works inside each person's role: a request for information that role cannot see is refused. Parents only ever get answers about their own children, and the server checks that on every request rather than trusting the app.",
        "The assistant drafts; people decide. When it prepares attendance, homework or a notice, the teacher sees the draft and nothing is saved or sent until they review it and tap Save or Post. A draft with a name it could not match cannot be saved at all.",
        "Every action taken through the assistant is logged with who did it, their role and the outcome, and each school has a daily allowance of AI calls. To write a reply, the question and the records needed to answer it go to Google Gemini; report-card drafts identify students by number, not by name. Parents can delete their own account from the app, as the privacy policy describes.",
      ].join("\n\n"),
    },
    // Recorded on 30 October 2026 in the iOS simulator against a local demo
    // school with made-up teachers and students; no real school data.
    media: {
      type: "video",
      portrait: true,
      src: "/media/cis-compass-demo.mp4",
      poster: "/media/cis-compass-demo-poster.jpg",
      alt: "CIS Compass on an iPhone: a teacher's home screen with today's classes, the day's timetable, quick actions and the AI assistant greeting the teacher.",
      caption:
        "A teacher's day in CIS Compass, shown with a demo school and made-up names.",
    },
    scope: [
      "Public school website",
      "Role-based management app",
      "Attendance, notifications & booking",
      "AI-assisted attendance & homework posting",
      "Class-level explanations & learning hints",
    ],
    delivery: {
      title: "In use at Chintamani",
      text: "The school website and CIS Compass are both live. Together, they cover how families first learn about the school and how staff and parents manage the school day. CIS Compass is Evaradh's first product, in use at Chintamani International School in Parbhani.",
    },
    details: [
      {
        title: "A view for each role",
        text: "Teachers, parents and operations staff use separate experiences within one platform. Access is organised around each role's responsibilities.",
      },
      {
        title: "Teacher check-in on campus",
        text: "I implemented teacher attendance with QR codes that refresh every 15 seconds and a 100-metre campus-radius restriction.",
      },
      {
        title: "Keeping parents informed",
        text: "As soon as a teacher submits attendance, parents get a notification, so nobody has to call the school to find out whether their child arrived.",
      },
      {
        title: "Appointments with a time and place",
        text: "Teachers publish when they are free and parents reserve one of those slots, so a conversation happens at an agreed time rather than interrupting a lesson.",
      },
      {
        title: "How it's built",
        text: "The teacher and parent apps are written in Flutter for Android and iOS. A TypeScript, Node.js and Express API with Prisma and PostgreSQL serves them and a React admin dashboard. Firebase Cloud Messaging delivers notifications, and the AI assistant runs on Google's Gemini API. The public school website is built with React and Vite and served from Cloudflare.",
      },
      {
        title: "The rest of the school day",
        text: "The same system covers assessments, behaviour, leave, timetables, calendars and parent–teacher appointments, alongside fees, notices and homework.",
      },
    ],
    tools: [
      "Role-based access",
      "School workflows",
      "Parent communication",
      "AI assistant",
    ],
    visual: "school",
  },
  {
    slug: "panda-manipulator",
    collection: "Featured",
    number: "02",
    title: "Cartesian motion for a Panda robot",
    shortTitle: "Panda robot motion planning",
    category: "Robotics",
    discipline: "Robotics · Motion planning",
    summary:
      "Cartesian motion and an autonomous drawing routine for a Panda robot arm, packaged in ROS.",
    contribution:
      "I independently developed the ROS package for Cartesian movement and autonomous geometric drawing with the Panda robot.",
    question:
      "How do you turn a geometric shape into a path a robot arm can follow?",
    approach:
      "I built a ROS package for a Panda manipulator with Cartesian control of the end-effector. A planning routine lets the arm draw a geometric shape autonomously.",
    context: "Independent robotics project",
    scope: [
      "ROS package development",
      "Cartesian end-effector control",
      "Autonomous geometric drawing",
    ],
    delivery: {
      title: "From geometry to a drawing routine",
      text: "The deliverable is a ROS package that combines Cartesian movement with an autonomous drawing routine for the Panda manipulator. I developed both the movement control and the routine that translates a geometric shape into positions for the end-effector.",
    },
    details: [
      {
        title: "Plan the path",
        text: "The drawing routine describes the end-effector's movement in Cartesian space, translating a shape into a sequence of positions.",
      },
      {
        title: "Move the arm",
        text: "The ROS package connects motion planning with the Panda manipulator so the arm can follow the drawing routine.",
      },
    ],
    tools: ["ROS", "Panda manipulator", "Motion planning"],
    visual: "robot",
  },
  {
    slug: "gesture-wheelchair",
    collection: "Featured",
    number: "03",
    title: "Gesture-controlled wheelchair",
    shortTitle: "Gesture-controlled wheelchair",
    category: "Robotics",
    discipline: "Embedded ML · Assistive technology",
    summary:
      "Hand gestures translated into wheelchair motor commands using sensors, machine learning and Arduino.",
    contribution:
      "I independently designed and built the Arduino-based gesture-control system, applying machine learning and embedded systems concepts.",
    question:
      "How can a hand gesture become a control signal for a wheelchair?",
    approach:
      "I connected sensor input, a machine-learning classifier and motor control in an Arduino-based wheelchair system. The classified hand gesture is mapped to a motor command.",
    context: "Independent embedded systems project",
    scope: [
      "Sensor-based gesture input",
      "Machine learning classification",
      "Arduino motor-command integration",
    ],
    delivery: {
      title: "A complete control path",
      text: "My work connected the input and output sides of the system: reading a hand gesture, classifying it and mapping it to a wheelchair motor command. The project brought machine learning and embedded control together in one Arduino-based build.",
    },
    details: [
      {
        title: "Read the gesture",
        text: "Sensors provide the input for a machine-learning model that classifies the hand gesture.",
      },
      {
        title: "Translate it into motion",
        text: "The classified gesture maps to motor commands in the Arduino-based wheelchair system, connecting the model's output with physical movement.",
      },
    ],
    tools: ["Arduino", "Machine learning", "Embedded systems"],
    visual: "gesture",
  },
  {
    slug: "image-classification",
    collection: "Academic experiments",
    number: "04",
    title: "ResNet18 & VGG13",
    shortTitle: "Image classification with ResNet18 & VGG13",
    category: "AI & ML",
    discipline: "Computer vision · Deep learning",
    summary:
      "ResNet18 and VGG13 take on the same handwritten digits. A comparison built in PyTorch.",
    contribution:
      "I independently implemented the image-classification comparison and evaluated ResNet18 and VGG13 on MNIST.",
    question:
      "How do two different network architectures approach the same image classification task?",
    approach:
      "I trained ResNet18 and VGG13 on MNIST using PyTorch. Keeping the dataset the same focuses the comparison on the architectures, including ResNet's residual connections and VGG's sequential layers.",
    context: "Academic experiment · Computer vision",
    scope: [
      "MNIST image classification",
      "Two PyTorch model implementations",
      "Architecture comparison & evaluation",
    ],
    delivery: {
      title: "What I built",
      text: "An image-classification comparison with two independently implemented networks. My work covered training and evaluating both models on handwritten digits, connecting the architecture of each network to the same classification task.",
    },
    details: [
      {
        title: "A shared dataset",
        text: "Both networks use MNIST, a dataset of handwritten digits. The task is to assign an input image to a digit class.",
      },
      {
        title: "Different paths through a network",
        text: "ResNet18 uses residual connections. VGG13 uses a sequential stack of layers. The project puts both architectures to work on the same task.",
      },
      {
        title: "Training and evaluation",
        text: "I implemented and evaluated both networks in PyTorch. The scope spans the model implementation, training and prediction stages, rather than using a hosted image-classification service.",
      },
    ],
    tools: ["PyTorch", "ResNet18", "VGG13", "MNIST"],
    visual: "networks",
  },
  {
    slug: "generative-networks",
    collection: "Academic experiments",
    number: "05",
    title: "Generative adversarial networks",
    shortTitle: "Generative adversarial networks",
    category: "AI & ML",
    discipline: "Generative models · Unsupervised learning",
    summary:
      "A PyTorch GAN that turns random noise into 28 × 28 digit images, with a custom training loop and loss tracking.",
    contribution:
      "I independently implemented a basic GAN to explore generative and unsupervised learning.",
    question:
      "How can a model learn to generate samples by competing with another model?",
    approach:
      "I implemented a fully connected GAN in PyTorch using MNIST. A generator maps a 100-value random noise vector to a 28 × 28 image. A discriminator receives real or generated images and predicts whether they came from the dataset. The training loop alternates between updating the two networks.",
    context: "Academic deep learning project · Public notebook",
    scope: [
      "Generator & discriminator in PyTorch",
      "MNIST training with Adam and BCE loss",
      "Sample grids & training-loss tracking",
    ],
    repository:
      "https://github.com/radhikadaithankar/Unsupervised-Learning-by-Generative-Adversarial-Nets-GAN-.",
    delivery: {
      title: "Inside the notebook",
      text: "The public notebook contains the network definitions, data loading, training loop and recorded training logs. It also includes code to save a 5 × 5 grid of generated samples after each epoch and plot the generator and discriminator losses. The experiment focuses on how adversarial training works.",
    },
    details: [
      {
        title: "Start with noise",
        text: "The generator expands a 100-dimensional noise vector through layers of 256, 512 and 1,024 units. LeakyReLU activations sit between the hidden layers, and a Tanh output produces the 784 values of a grayscale digit image.",
      },
      {
        title: "Train both sides",
        text: "The discriminator reduces a flattened image through layers of 1,024, 512 and 256 units to a real-or-generated probability. Both networks use Adam optimisers and binary cross-entropy loss. The notebook configures 100 epochs with batches of 100 and a learning rate of 0.0002.",
      },
      {
        title: "Watch the training process",
        text: "MNIST images are normalised before training. The loop records each network's loss and the time per epoch, while the sample-grid helper makes it possible to inspect the generated images as training progresses.",
      },
    ],
    tools: ["PyTorch", "MNIST", "Adam", "Matplotlib"],
    visual: "gan",
  },
];

// Public academic notebooks reviewed on 29 September 2026. These are
// coursework experiments, not claims of production-ready implementations.
export const notebooks = [
  {
    title: "Regression & regularisation",
    description:
      "A coursework notebook exploring linear regression on the diabetes dataset, manual gradient updates, learning rates and polynomial fitting with regularisation.",
    tools: ["PyTorch", "Gradient descent", "Matplotlib"],
    url: "https://github.com/radhikadaithankar/Regression",
  },
  {
    title: "Gaussian mixtures & vowel data",
    description:
      "An unsupervised learning notebook exploring vowel formant frequencies with expectation-maximisation. Includes experiments with three and six Gaussian components and saved model parameters.",
    tools: ["NumPy", "Gaussian mixtures", "Clustering"],
    url: "https://github.com/radhikadaithankar/Unsupervised-Learning",
  },
];
