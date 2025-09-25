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
      "HIVE-FU was created to address the significant barrier of safeguarding astronaut health during long-duration missions to Mars. Through extensive academic research, market research, and interviews with experts and stakeholders, the team identified key challenges like communication delays with Earth and limited on-board medical expertise. This led to the development of a fully-integrated, compact ultrasound system capable of diagnosing, planning, and treating medical emergencies. The final design, a robotic arm with a concave probe head, was brought to life using CAD and Blender, demonstrating a feasible and innovative solution for enabling crew autonomy.",
    skills: ["Literature Review", "User Research Methods", "CAD", "OnShape", "Blender", "Presentation Skills", "STEEP Framework", "Speculative Engineering"],
    documents: [
      {
        label: "Technical Report",
        url: "https://www.dropbox.com/s/example/your-technical-report.pdf?dl=0",
      },
      {
        label: "User Research Findings",
        url: "https://www.dropbox.com/s/example/user-research.pdf?dl=0",
      },
    ],
  },
  {
    slug: "cyclogic",
    name: "Cyclogic",
    module: "Innovation and Enterprise Module",
    date: "October 2024 - December 2024",
    description:
      "Cyclogic is a cyclist navigation app designed to address the unpredictable nature of cycling and the lack of a dedicated tool for riders. We found a significant gap in the market for a specialized app through extensive user research, including interviews, surveys, and competitor analysis. This research revealed that cyclists often fear road conditions and inattentive drivers. To tackle this, we built a functional prototype in Figma with an upgraded UI/UX, aiming to provide a customer-driven database of routes and real-time updates. User testing showed overwhelmingly positive feedback, confirming the prototype was a success in providing crucial, digestible information for cyclists. We learned that focusing on cyclist-specific needs and concerns can lead to a highly impactful product.",
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
      "The Google Companion was developed to address the challenge young adults with ADHD face in maintaining focus and transitioning out of hyperfocus. Through extensive user research, including interviews with users and industry experts, we identified key pain points related to productivity. We built a subtle desktop focus companion that guides users' productivity journeys, creating a personalized experience. The project was highly impactful, with user testing revealing a 60% increase in study time. The team learned the importance of continuous iteration, creating over 20 component iterations to perfect the user experience and ensure the product was highly usable.",
    skills: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Graphic Design", "Video Editing", "User Testing"],
    documents: [
      {
        label: "Portfolio",
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
      "The project aimed to create a real-time musical instrument that translates physical movement into sound, guided by the theme \"more than meets the eye.\" We designed and built a large, expressive musical instrument using a Hoberman Sphere, with additional controllers for more features. The sphere and controllers were manufactured using laser cutting and 3D printing. A Bela board was programmed using C++ and PureData to map sensor inputs from the physical sphere to control musical parameters like volume and pitch, resulting in a unique, tangible musical experience.",
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
      "The project was initiated to address the significant problem of medical packaging for older adults and those suffering from arthritis, a population that includes over 10 million people in the UK. A survey of 160 respondents confirmed that individuals aged 41-71+ experience the most pain from current packaging designs. The primary user needs identified were autonomy in opening their own packaging, recyclability, and not having to rely on external organizations. The design process was highly user-oriented, with continuous feedback from the target demographic informing all decisions. To create the best possible solution, the team used an iterative design approach, creating over 20 different prototypes. The project demonstrated its impact through successful prototype testing, where users expressed high satisfaction and a sense of improved autonomy. The team also conducted simulated tests with younger people to further validate the design.",
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
      "For my Computing 2 project, we were tasked with creating a turn based game. Basing it off the hit NY Times game Wordle, I created Dinosaurdle! The premise of the game is to continue finding the right 5 letter word before the \"Dinosaur\" catches up with you. The development of this game introduced web development to me, teaching me the basics of JavaScript, HTML and CSS. It also taught me the importance of APIs, and how it communicates between the client and the server. You can play it using the button below the image gallery!",
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
      "The BloomBums project was created to tackle the significant environmental problem of disposable diaper waste, which contributes over 3 billion nappies to landfills annually. By defining the problem through a STEEP framework and conceptualizing a complete closed-loop system using a Circular Business Ecosystem Model Canvas, the team developed a solution designed to eliminate nearly 400,000 tonnes of waste in the UK alone. The final product, a 100% recyclable diaper PSS (Product-Service System), was visualized through CAD software like Blender and Fusion 360, demonstrating a holistic and sustainable approach to a major consumer goods problem.",
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
      "Conducting finite element analysis (FEA) on a hip implant, redesigning it to match a design criteria of certain resonant frequencies and load cycles.",
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
      "Using Solidworks, I remodeled the 1958 Chevrolet Corvette to perform a CFD simulation. After using both computational and hand-calculations on the car, improvements were made and remodeled to reduce drag and increase down force. The second model had reduced the drag from 0.51 to 0.24.",
    skills: ["Computational Fluid Dynamics", "CAD", "Solidworks ", "Fusion360", "Blender", "Engineering Principles", "Academic Research"],
    documents: [
      {
        label: "Technical Report",
        url: "https://www.dropbox.com/scl/fi/eu9zs65n5ktcwbrpb0kxu/1958-chevrolet-corvette-cfd.pdf?rlkey=1yg80u98r9yb99ue8bablfi79&e=1&st=dcwojkbm&dl=0 ",
      },
    ],
  },
];