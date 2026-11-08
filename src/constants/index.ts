const email = "princepal262501@gmail.com";
const phone = "+917618486202";
const githubUsername = "princepal09";

export const profile = {
  name: "Prince Pal",
  role: "Full Stack Developer",
  tagline: "I build full-stack web apps, admin dashboards, and APIs.",
  bio: "Crafting modern web experiences with a focus on user experience and performance.",
  location: "Bhimtal, Nainital, Uttarakhand, India",
  email,
  emailHref: `mailto:${email}`,
  phoneLabel: "+91 7618486202",
  phoneHref: `tel:${phone}`,
  githubUsername,
  githubUrl: `https://github.com/${githubUsername}`,
  linkedinUrl: "https://linkedin.com/in/princepal09",
  instagramUrl: "https://www.instagram.com/iprince_pal/",
  resumeUrl: "/PRINCE_RESUME.pdf",
};

export const siteLinks = {
  home: "/",
  projectDetails: "/projects",
  nextjs: "https://nextjs.org/",
  githubActivity: "/api/github",
  githubGraphql: "https://api.github.com/graphql",
  formspree: "https://formspree.io/f/mkjjaypn",
};

export const siteAssets = {
  portrait: "/profile.jpg",
  hero: "/hero.svg",
  contact: "/contact.svg",
};

export const sections = {
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  github: "github",
  contact: "contact",
};

export const navigation = [
  { label: "About", id: sections.about },
  { label: "Projects", id: sections.projects },
  { label: "Experience", id: sections.experience },
  { label: "Skills", id: sections.skills },
  { label: "GitHub", id: sections.github },
  { label: "Contact", id: sections.contact },
];

export const contactTopics = ["Freelance project", "Job opportunity", "Something else"];

export const technologyCategories = ["Frontend", "Backend & Languages", "Databases", "Tools"] as const;

export interface ITech {
  name: string;
  logo: string;
  category: (typeof technologyCategories)[number];
  lightLogo?: boolean;
}

export interface IProject {
  title: string;
  description: string;
  image: string;
  featured?: { label: string; width: number; height: number };
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  features: string[];
  detail?: {
    slug: string;
    label: string;
    kind: string;
    transferDemo?: boolean;
    sections: { title: string; text: string }[];
  };
}

export const technologies: ITech[] = [
  {
    name: "HTML5",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vite",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Redux Toolkit",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend & Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    category: "Backend & Languages",
    lightLogo: true,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "FastAPI",
    category: "Backend & Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    category: "Databases",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    category: "Databases",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Git",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    category: "Tools",
    lightLogo: true,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Java",
    category: "Backend & Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    category: "Backend & Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    category: "Backend & Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Redis",
    category: "Databases",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Socket.IO",
    category: "Backend & Languages",
    lightLogo: true,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
  {
    name: "Docker",
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Prisma",
    category: "Databases",
    lightLogo: true,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
];

export const projects: IProject[] = [
  {
    title: "The Rock Lizard Adventure",
    description:
      "A trekking website with trip search, visitor enquiries, and an admin dashboard for the expedition team.",
    image: "/rock-lizard-adventure.png",
    featured: { label: "Freelance Project", width: 1530, height: 690 },
    technologies: ["Next.js", "TypeScript", "Express.js", "Prisma", "MySQL", "Tailwind CSS", "Cloudinary"],
    githubUrl: "https://github.com/princepal09/TheRockLizardAdventure",
    liveUrl: "https://therocklizard.com/",
    detail: {
      slug: "rock-lizard-adventure",
      label: "Read case study",
      kind: "Freelance case study",
      sections: [
        {
          title: "The client’s goal",
          text: "Give visitors one place to discover treks and contact the expedition team, while giving staff a way to keep trip information up to date.",
        },
        {
          title: "What I built",
          text: "I built the public trip search, listings, photo gallery, and enquiry forms, along with the admin dashboard the team uses to publish trips and manage content.",
        },
        {
          title: "How the pieces fit together",
          text: "The Next.js frontend handles the visitor experience, while an Express API and MySQL database accessed through Prisma support trip and content management.",
        },
      ],
    },
    features: [
      "Trek search and trip listings",
      "Photo gallery and enquiry forms",
      "Admin dashboard for publishing trips and managing site content",
    ],
  },
  {
    title: "StudyNotion",
    description:
      "A learning platform where instructors publish courses and students purchase lessons and track their progress.",
    image: "/studynotion.png",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Cloudinary",
      "Redux",
    ],
    liveUrl: "https://study-notion-ruddy-six.vercel.app/",
    githubUrl: "https://github.com/princepal09/StudyNotion",
    features: [
      "Student and Instructor authentication",
      "Course creation and management",
      "Secure course purchasing with Razorpay",
      "Video-based learning experience",
      "Cloud-based media storage with Cloudinary",
      "Progress tracking and course enrollment",
      "Role-based access control",
      "Responsive and intuitive user interface",
    ],
  },
  {
    title: "IEIT Computer Institute",
    description:
      "A freelance website and admin dashboard for managing the institute’s courses and content.",
    image: "/ieit.jpg",
    technologies: [
      "React",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "TanStack Query",
      "Redux Toolkit",
      "Node.js",
      "Redis",
    ],
    githubUrl: "https://github.com/princepal09/IEIT---Computer-Institute",
    features: [
      "Admin dashboard for content management",
      "Course creation and updates",
      "Secure admin authentication",
      "TanStack Query for API state management",
      "PostgreSQL database with Prisma",
      "Redis caching and rate limiting",
      "Responsive design",
    ],
  },

  {
    title: "Social Media App",
    description:
      "A social platform for sharing posts, connecting with other users, and messaging in real time.",

    image: "/socialmediaapp.png",

    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Cloudinary",
      "Rate Limiting",
      "Caching",
    ],

    liveUrl: "https://social-media-app-tan-three.vercel.app/",
    githubUrl: "https://github.com/princepal09/SocialMediaApp",

    features: [
      "Secure user authentication and authorization using JWT",
      "Real-time communication and updates powered by Socket.IO",
      "User profile creation and management",
      "Create, update, and delete posts",
      "Like, comment, and interact with posts",
      "Connect and interact with other users",
      "API rate limiting for improved security and abuse prevention",
      "Caching for faster response times and improved performance",
      "Cloud-based media and image storage",
      "Responsive and modern user interface",
    ],
  },
  {
    title: "Banking Ledger API",
    description:
      "A banking API for account management and fund transfers that prevents retries from creating duplicate transactions.",
    image: "/banking-ledger.png",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Nodemailer",
      "Render",
    ],
    liveUrl: "https://banking-ledger-eix1.onrender.com/",
    githubUrl: "https://github.com/princepal09/Banking_Ledger",
    detail: {
      slug: "banking-ledger",
      label: "Try transfer walkthrough",
      kind: "Backend walkthrough",
      transferDemo: true,
      sections: [
        {
          title: "Why retries matter",
          text: "A transfer can succeed even if the network drops before the client sees the response. Retrying with the same idempotency key identifies the original transfer and prevents a second debit.",
        },
      ],
    },
    features: [
      "JWT-based authentication and authorization",
      "Account creation and ledger management",
      "Credit and debit transaction processing",
      "Fund transfers with idempotency key support",
      "Secure password hashing using bcrypt",
      "RESTful API built with Express.js and MongoDB",
      "Deployed on Render",
    ],
  },
];

export interface IExperience {
  company: string;
  logo?: string;
  role: string;
  location?: string;
  duration: string;
  current?: boolean;
  description?: string;
  contributions?: string[];
  technologies: string[];
  certificate?: string;
}

export const experiences: IExperience[] = [
  {
    company: "Mend Solutions",
    logo: "/mend-logo.png",
    role: "Software Engineer Trainee",
    duration: "Present",
    current: true,
    contributions: [
      "Contribute to a full-stack application built with PostgreSQL, Express.js, React, and Node.js.",
      "Work with FastAPI alongside the main application stack.",
      "Help deploy applications to a virtual private server (VPS).",
    ],
    technologies: [
      "PostgreSQL",
      "Express.js",
      "React",
      "Node.js",
      "TypeScript",
      "FastAPI",
      "Docker",
      "VPS",
    ],
  },
  {
    company: "3Skills",
    logo: "/3skills-logo.png",
    role: "Web Developer Intern",
    location: "Remote",
    duration: "Dec 5, 2025 - Feb 5, 2026",
    description:
      "Contributed to MERN stack applications by building responsive React interfaces, developing REST APIs with Node.js and Express.js, integrating MongoDB, and collaborating with the team using Git and GitHub.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Git",
      "GitHub",
    ],
    certificate: "/Certificate_INTERN260102_Prince Pal.pdf",
  },
];
