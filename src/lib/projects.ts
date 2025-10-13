// FILE: src/lib/projects.ts

export interface Project {
  slug: string;
  name: string;
  module: string;
  date: string;
  description: string;
  skills: string[];
  documents?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    slug: "hive-fu",
    name: "HIVE-FU",
    module: "Futures Design Engineering (Speculative)",
    date: "October 2024 - March 2025",
    description:
      "HIVE-FU addresses the critical challenge of safeguarding astronaut health during long-duration Mars missions where communication delays make Earth-based support impossible. Through extensive research, we identified the need for autonomous medical capabilities onboard. We developed a fully-integrated, compact robotic ultrasound system for diagnosis, planning, and treatment. The final design was brought to life using CAD and Blender, demonstrating a feasible solution for enabling crew autonomy in medical emergencies.",
    skills: ["Literature Review", "User Research Methods", "CAD", "OnShape", "Blender", "Presentation Skills", "STEEP Framework", "Speculative Engineering"],
    documents: [
      {
        label: "Full Report",
        url: "https://www.dropbox.com/scl/fi/4lgg4xbvrr9c6ghiu1uwq/Group14-HIVEFU.pdf?rlkey=hnap7uc11ufwp4ljlp3wwwg9s&st=yi17dz0e&dl=0",
      },
    ],
  },
  {
    slug: "cyclogic",
    name: "Cyclogic",
    module: "Innovation and Enterprise Module",
    date: "October 2024 - December 2024",
    description:
      "Cyclogic is a cyclist navigation app designed to address the market gap for a tool tailored to the unpredictable nature of cycling. Extensive user research revealed that cyclists' primary concerns are poor road conditions and inattentive drivers. To tackle this, we built a functional prototype in Figma with an intuitive UI/UX, providing a customer-driven database of routes and real-time updates. Overwhelmingly positive feedback from user testing confirmed the prototype was a success in providing crucial, digestible information for cyclists.",
    skills: ["Figma", "User Research", "Prototyping", "UI/UX Design", "Data Analysis"],
    documents: [
      {
        label: "Business Report",
        url: "https://www.dropbox.com/scl/fi/pnanp4q0eb1lsoghoz8dd/Cyclogic-Team6.pdf?rlkey=qprph1v5sb18maz6gmpqro7pw&e=1&st=uht73d8d&dl=0",
      },
    ],
  },
  {
    slug: "google-companion",
    name: "Google Companion",
    module: "Industrial Design Engineering",
    date: "January 2024 - June 2024",
    description:
      "The Google Companion was developed to help young adults with ADHD maintain focus and smoothly transition out of hyperfocus states. Through user and expert interviews, we identified key productivity pain points and built a subtle desktop companion to guide users' focus journeys. This personalized experience proved highly impactful, with user testing revealing a 60% increase in study time. The project taught us the importance of continuous iteration, as we created over 20 component variations to perfect the user experience.",
    skills: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Graphic Design", "Video Editing", "User Testing"],
    documents: [
      {
        label: "Development Report",
        url: "https://www.dropbox.com/scl/fi/9jij06dawndid7ext6gsd/companion-a3-portfolio.pdf?rlkey=aytxqlacxyp4jbc65imi84kzh&e=1&st=t5tepnsv&dl=0",
      },
      {
        label: "Technical Report",
        url: "https://www.dropbox.com/scl/fi/bsp9wxkr0q7f2ubttfzaf/companion-a4-report.pdf?rlkey=yzggan2c8wb3seitjwa8mzfvv&e=1&st=6zik2t7f&dl=0",
      },
    ],
  },
  {
    slug: "pulsar",
    name: "Pulsar",
    module: "Physical Computing",
    date: "October 2023 - December 2023",
    description:
      "Guided by the theme \"more than meets the eye,\" this project aimed to create a real-time musical instrument translating physical movement into sound. We designed and built a large, expressive instrument using a Hoberman Sphere, manufactured with laser cutting and 3D printing. A Bela board was programmed using C++ and PureData to map the sphere's sensor inputs to musical parameters like volume and pitch. The result was a unique and tangible musical experience.",
    skills: ["Manufacturing", "Prototyping", "Electronics & Programming", "Music & Audio", "CAD", "Arduino Style C++", "PureData"],
    documents: [
      {
        label: "Development Portfolio",
        url: "https://www.dropbox.com/scl/fi/gy18255scvzbtqetf80vh/Gizmo-Portfolio.pdf?rlkey=l2j1ztfitteevrxaarodjyq6k&e=1&st=7l9jpve5&dl=0",
      },
    ],
  },
  {
    slug: "viapak",
    name: "Viapak",
    module: "Human-Centred Design Engineering",
    date: "January 2022 - June 2022",
    description:
      "This project addressed the significant challenge of medical packaging for older adults and those with arthritis. User research confirmed that this demographic struggled with autonomy and existing packaging designs. We adopted a highly user-oriented, iterative design approach, creating over 20 prototypes based on continuous feedback from the target users. Successful prototype testing demonstrated high user satisfaction and a renewed sense of autonomy, validating our human-centered design process.",
    skills: ["Manufacturing", "Prototyping", "User Research ", "User Interviews", "Usability Testing", "Presentation"],
    documents: [
      {
        label: "Full Report",
        url: "https://www.dropbox.com/scl/fi/zfr0e3t5gosajo1u9v5t7/viapak.pdf?rlkey=yok73rsoptwkgx7dbjtc01k8m&e=1&st=vwx3up3n&dl=0",
      },
    ],
  },
  {
    slug: "dinosaurdle",
    name: "Dinosaurdle",
    module: "Computing 2: Web Dev",
    date: "March 2022 - June 2022",
    description:
      "For a university project, I created Dinosaurdle, a turn-based game inspired by the hit NY Times game, Wordle. The premise is to guess the correct 5-letter word before a \"dinosaur\" catches up to you. This project served as my introduction to web development, teaching me the fundamentals of JavaScript, HTML, and CSS. It also provided practical experience with APIs and client-server communication.",
    skills: ["JavaScript", "HTML", "CSS ", "UI/UX Design", "WCAG Guidelines", "APIs", "Software Development"],
    documents: [
      {
        label: "Play Here",
        url: "https://lialex054.github.io/dinosaurdle/",
      },
    ],
  },
  {
    slug: "bloombums",
    name: "BloomBums",
    module: "Sustainable Design Engineering",
    date: "October 2023 - December 2023",
    description:
      "The BloomBums project tackled the massive environmental problem of disposable diaper waste in the UK. Using a STEEP framework, we conceptualized a closed-loop system to eliminate nearly 400,000 tonnes of annual waste. We developed a 100% recyclable diaper Product-Service System (PSS) and visualized it using CAD software like Blender and Fusion 360. This project demonstrated a holistic and sustainable approach to a major consumer goods problem.",
    skills: ["Sustainability", "CAD", "Blender ", "Fusion360", "STEEP Framework", "User Research", "Market Analysis"],
    documents: [
      {
        label: "Full Report",
        url: "https://www.dropbox.com/scl/fi/86p3gl75xaxeyxb9g3vl7/BloomBums-A3.pdf?rlkey=xx7hgissrv4z83bdxj9yklcoy&e=1&st=im85qri7&dl=0",
      },
    ],
  },
  {
    slug: "fea-hip-prosthetic",
    name: "FEA: Hip Prosthetic",
    module: "Finite Element Analysis",
    date: "January 2024 - March 2024",
    description:
      "This project involved conducting a complete finite element analysis (FEA) on a hip implant. The primary goal was to redesign the implant to meet a specific design criteria of resonant frequencies and load cycles. Using tools like Solidworks and Ansys, the implant was analyzed and modified to improve its structural performance. This provided practical experience in applying engineering principles and academic research to a real-world biomedical problem.",
    skills: ["Finite Element Analysis", "CAD", "Solidworks ", "Fusion360", "Blender", "Ansys", "Engineering Principles", "Academic Research"],
    documents: [
      {
        label: "Technical Report",
        url: "https://www.dropbox.com/scl/fi/74epyefxguctdtmzrs5ow/hip-implant-report.pdf?rlkey=1hatuvuxn5b6mwky4sogx35f4&e=1&st=pcv5ebii&dl=0",
      },
    ],
  },
  {
    slug: "cfd-corvette",
    name: "CFD: Corvette",
    module: "Computational Fluid Dynamics",
    date: "January 2024 - March 2024",
    description:
      "Using Solidworks, I remodeled the 1958 Chevrolet Corvette to perform a detailed computational fluid dynamics (CFD) simulation. After establishing baseline performance with both computational and hand-calculations, improvements were made to the car's geometry. The redesigned model was then re-analyzed to validate the changes. The final iteration successfully reduced the car's drag coefficient from 0.51 to an impressive 0.24.",
    skills: ["Computational Fluid Dynamics", "CAD", "Solidworks ", "Fusion360", "Blender", "Engineering Principles", "Academic Research"],
    documents: [
      {
        label: "Technical Report",
        url: "https://www.dropbox.com/scl/fi/eu9zs65n5ktcwbrpb0kxu/1958-chevrolet-corvette-cfd.pdf?rlkey=1yg80u98r9yb99ue8bablfi79&e=1&st=dcwojkbm&dl=0 ",
      },
    ],
  },
  {
    slug: "kaikaku-fusion",
    name: "KAIKAKU Fusion Trailer",
    module: "Freelance Project",
    date: "May 2025 - June 2025",
    description:
      "For this freelance project, I was hired by the startup KAIKAKU to create a captivating trailer for their new flagship product, \"Fusion.\" My role involved storyboarding, video editing, and creating 3D assets to effectively communicate their vision. I utilized the Adobe Suite and Blender, collaborating closely with their team to ensure the final product aligned with their brand identity. The resulting trailer was well-received, helping to boost KAIKAKU's visibility and engagement.",
    skills: ["Blender", "Adobe Premiere Pro"],
    documents: [
      {
        label: "Video Link on X",
        url: "https://x.com/joseflchen/status/1951287497880670328"
  }],
  },
];