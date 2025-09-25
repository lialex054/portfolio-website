export interface Project {
  slug: string;
  name: string;
  module: string;
  date: string;
  description: string;
  images: string[];
  skills: string[]; // Add the new skills property
}

export const projects: Project[] = [
  {
    slug: "hive-fu",
    name: "HIVE-FU",
    module: "Futures Design Engineering (Speculative)",
    date: "October 2024 - March 2025",
    description:
      "HIVE-FU was created to address the significant barrier of safeguarding astronaut health during long-duration missions to Mars. Through extensive academic research, market research, and interviews with experts and stakeholders, the team identified key challenges like communication delays with Earth and limited on-board medical expertise. This led to the development of a fully-integrated, compact ultrasound system capable of diagnosing, planning, and treating medical emergencies. The final design, a robotic arm with a concave probe head, was brought to life using CAD and Blender, demonstrating a feasible and innovative solution for enabling crew autonomy.",
    images: ["p1_large.jpg", "p1_small1.jpg", "p1_small2.jpg", "p1_small3.jpg", "p1_small4.jpg"],
    // Add some example skills
    skills: ["Literature Review", "User Research Methods", "CAD", "OnShape", "Blender", "Presentation Skills", "STEEP Framework", "Speculative Engineering"],
  },
  {
    slug: "cyclogic",
    name: "Cyclogic",
    module: "Innovation and Enterprise Module",
    date: "October 2024 - December 2024",
    description:
      "Cyclogic is a cyclist navigation app designed to address the unpredictable nature of cycling and the lack of a dedicated tool for riders. We found a significant gap in the market for a specialized app through extensive user research, including interviews, surveys, and competitor analysis. This research revealed that cyclists often fear road conditions and inattentive drivers. To tackle this, we built a functional prototype in Figma with an upgraded UI/UX, aiming to provide a customer-driven database of routes and real-time updates. User testing showed overwhelmingly positive feedback, confirming the prototype was a success in providing crucial, digestible information for cyclists. We learned that focusing on cyclist-specific needs and concerns can lead to a highly impactful product.",
    images: ["p1_large.jpg", "p1_small1.jpg", "p1_small2.jpg", "p1_small3.jpg", "p1_small4.jpg"],
    // Add some example skills
    skills: ["Figma", "User Research", "Prototyping", "UI/UX Design", "Data Analysis"],
  },
  {
    slug: "google-companion",
    name: "Google Companion",
    module: "Industrial Design Engineering",
    date: "January 2024 - June 2024",
    description:
      "The Google Companion was developed to address the challenge young adults with ADHD face in maintaining focus and transitioning out of hyperfocus. Through extensive user research, including interviews with users and industry experts, we identified key pain points related to productivity. We built a subtle desktop focus companion that guides users' productivity journeys, creating a personalized experience. The project was highly impactful, with user testing revealing a 60% increase in study time. The team learned the importance of continuous iteration, creating over 20 component iterations to perfect the user experience and ensure the product was highly usable.",
    images: ["p2_large.jpg", "p2_small1.jpg", "p2_small2.jpg", "p2_small3.jpg", "p2_small4.jpg"],
    skills: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Graphic Design", "Video Editing", "User Testing"],
  },
  {
    slug: "pulsar",
    name: "Pulsar",
    module: "Physical Computing",
    date: "October 2023 - December 2023",
    description:
      "The project began with a core problem: how might we enable two young adults with musical backgrounds to create and express music in real-time through a physical, tangible vessel? Guided by the prompt \"more than meets the eye,\" we embarked on a journey of exploration and design. We started by obsessing over the Hoberman Sphere, ultimately deciding to use it as the physical form to represent the \"breath\" of music. The manufacturing process was a crucial part of the project. We used laser cutting to create the repetitive parts of the Hoberman Sphere from scratch. After encountering high friction with initial wood pieces, we iterated on the design and material, successfully switching to acrylic. For the side controllers, 3D printing was the ideal method, with the designs modeled in Blender and Fusion 360 after creating initial prototypes with low-fidelity foam. The final prototype was brought to life through intricate programming on a Bela board, an Arduino-style microcontroller. Using C++, we mapped values from various sensors to musical parameters, such as using a proximity sensor for volume and a Trill Sensor for pitch and melody. A stick controller was also implemented for tremolo. We used PureData, an open-source software, to generate music using a random number generator and our basic knowledge of music theory to create a piece that could be controlled physically by the sphere. The project successfully met our initial goal, resulting in a unique and fully functional musical instrument that embodies our design prompt.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Manufacturing", "Prototyping", "Electronics & Programming", "Music & Audio", "CAD", "Arduino Style C++", "PureData"],
  },
  {
    slug: "viapak",
    name: "Viapak",
    module: "Human-Centred Design Engineering",
    date: "January 2022 - June 2022",
    description:
      "The project was initiated to address the significant problem of medical packaging for older adults and those suffering from arthritis, a population that includes over 10 million people in the UK. A survey of 160 respondents confirmed that individuals aged 41-71+ experience the most pain from current packaging designs. The primary user needs identified were autonomy in opening their own packaging, recyclability, and not having to rely on external organizations. The design process was highly user-oriented, with continuous feedback from the target demographic informing all decisions. To create the best possible solution, the team used an iterative design approach, creating over 20 different prototypes. The project demonstrated its impact through successful prototype testing, where users expressed high satisfaction and a sense of improved autonomy. The team also conducted simulated tests with younger people to further validate the design.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Manufacturing", "Prototyping", "User Research ", "User Interviews", "Usability Testing", "Presentation"],
  },
  {
    slug: "dinosaurdle",
    name: "Dinosaurdle",
    module: "Computing 2: Web Dev",
    date: "March 2022 - June 2022",
    description:
      "For my Computing 2 project, we were tasked with creating a turn based game. Basing it off the hit NY Times game Wordle, I created Dinosaurdle! The premise of the game is to continue finding the right 5 letter word before the \"Dinosaur\" catches up with you. The development of this game introduced web development to me, teaching me the basics of JavaScript, HTML and CSS. It also taught me the importance of APIs, and how it communicates between the client and the server. You can play it now on https://lialex054.github.io/dinosaurdle/.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["JavaScript", "HTML", "CSS ", "UI/UX Design", "WCAG Guidelines", "APIs", "Software Development"],
  },
  {
    slug: "bloombums",
    name: "BloomBums",
    module: "Sustainable Design Engineering",
    date: "October 2023 - December 2023",
    description:
      "The BloomBums project was created to tackle the significant environmental problem of disposable diaper waste, which contributes over 3 billion nappies to landfills annually. By defining the problem through a STEEP framework and conceptualizing a complete closed-loop system using a Circular Business Ecosystem Model Canvas, the team developed a solution designed to eliminate nearly 400,000 tonnes of waste in the UK alone. The final product, a 100% recyclable diaper PSS (Product-Service System), was visualized through CAD software like Blender and Fusion 360, demonstrating a holistic and sustainable approach to a major consumer goods problem.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Sustainability", "CAD", "Blender ", "Fusion360", "STEEP Framework", "User Research", "Market Analysis"],
  },
  {
    slug: "fea-hip-prosthetic",
    name: "FEA: Hip Prosthetic",
    module: "Finite Element Analysis",
    date: "January 2024 - March 2024",
    description:
      "Conducting finite element analysis (FEA) on a hip implant, redesigning it to match a design criteria of certain resonant frequencies and load cycles.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Finite Element Analysis", "CAD", "Solidworks ", "Fusion360", "Blender", "Ansys", "Engineering Principles", "Academic Research"],
  },
  {
    slug: "cfd-corvette",
    name: "CFD: Corvette",
    module: "Computational Fluid Dynamics",
    date: "January 2024 - March 2024",
    description:
      "Using Solidworks, I remodeled the 1958 Chevrolet Corvette to perform a CFD simulation. After using both computational and hand-calculations on the car, improvements were made and remodeled to reduce drag and increase down force. The second model had reduced the drag from 0.51 to 0.24.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Computational Fluid Dynamics", "CAD", "Solidworks ", "Fusion360", "Blender", "Engineering Principles", "Academic Research"],
  },
];