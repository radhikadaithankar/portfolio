export type ProjectMedia = {
  type: "video" | "gif";
  src: string;
  poster: string;
  alt: string;
  caption?: string;
};

export type ProjectDetail = { title: string; text: string };

export type SchoolCaseStudy = {
  oneLiner?: string;
  problem?: string;
  aiAssistant?: ProjectDetail[];
  results?: string;
  measurableResult?: string;
  privacyAndSafety?: string;
  nextSteps?: { cisPassport?: string; teacherAiTraining?: string };
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
      "The school website and CIS Compass, Evaradh's school management app, with AI support for teacher tasks and class-level explanations. In use at Chintamani International School.",
    contribution:
      "I independently built the school website and CIS Compass, including the role-based workflows, attendance, parent notifications and appointment booking.",
    question:
      "How do you bring daily school operations and parent communication into the same system?",
    approach:
      "I built both the public school website and CIS Compass, the school management app developed under Evaradh. The website introduces the school and gives families a route into admissions. The app brings attendance, fees, homework, notices and student records into one system, with separate experiences for parents, teachers and operations staff.",
    context: "Production · Evaradh / CIS, Parbhani",
    resultLine: "In use at Chintamani International School, Parbhani.",
    caseStudy: {
      oneLiner:
        "CIS Compass brings school operations and an AI assistant for teachers into one app, in use at Chintamani International School.",
      // TODO(cis-problem): Describe the school's previous workflow and the specific
      // problems teachers, parents or office staff faced before Compass.
      problem: undefined,
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
        "The school website and CIS Compass are both live. CIS Compass is Evaradh's first product, in use at Chintamani International School in Parbhani.",
      // TODO(cis-results): Add a measured result only with its baseline, period and
      // source. No user counts, time savings or accuracy figures are assumed.
      measurableResult: undefined,
      // TODO(cis-privacy): Confirm what data the assistant can access, access
      // controls, retention and the safeguards actually implemented.
      privacyAndSafety: undefined,
      nextSteps: {
        // TODO(cis-passport): Describe CIS Passport and confirm its planned scope
        // and status. Do not imply that an unshipped feature is available.
        cisPassport: undefined,
        // TODO(teacher-ai-training): Describe the teacher AI training plan and
        // confirm its status before publishing it.
        teacherAiTraining: undefined,
      },
    },
    // TODO(cis-walkthrough): Supply a video or GIF, a still poster, descriptive alt
    // text and an optional caption. Do not publish private school or student data.
    media: undefined,
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
        text: "I built real-time notifications triggered by student attendance submission, so parents can see when their child's attendance has been marked.",
      },
      {
        title: "Appointments with a time and place",
        text: "I built a booking workflow where teachers publish their availability and parents reserve designated appointment slots.",
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
    number: "04",
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
    number: "05",
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
    number: "02",
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
    number: "03",
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
