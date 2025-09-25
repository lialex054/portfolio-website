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
  },{
    slug: "viapak",
    name: "Viapak",
    module: "Human-Centred Design Engineering",
    date: "January 2022 - June 2022",
    description:
      "The project was initiated to address the significant problem of medical packaging for older adults and those suffering from arthritis, a population that includes over 10 million people in the UK. A survey of 160 respondents confirmed that individuals aged 41-71+ experience the most pain from current packaging designs. The primary user needs identified were autonomy in opening their own packaging, recyclability, and not having to rely on external organizations. The design process was highly user-oriented, with continuous feedback from the target demographic informing all decisions. To create the best possible solution, the team used an iterative design approach, creating over 20 different prototypes. The project demonstrated its impact through successful prototype testing, where users expressed high satisfaction and a sense of improved autonomy. The team also conducted simulated tests with younger people to further validate the design.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["Manufacturing", "Prototyping", "User Research ", "User Interviews", "Usability Testing", "Presentation"],
  },
];