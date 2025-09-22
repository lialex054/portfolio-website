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
    slug: "project-name-one",
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
    slug: "project-name-two",
    name: "PROJECT NAME TWO",
    module: "ANOTHER MODULE",
    date: "August 2025 - September 2025",
    description:
      "This is a description for the second project. It showcases different skills and challenges overcome during development.",
    images: ["p2_large.jpg", "p2_small1.jpg", "p2_small2.jpg", "p2_small3.jpg", "p2_small4.jpg"],
    skills: ["Figma", "UI/UX Design", "User Research"],
  },
  {
    slug: "project-name-three",
    name: "PROJECT NAME THREE",
    module: "DESIGN MODULE",
    date: "June 2025 - July 2025",
    description:
      "This project focused heavily on user interface and user experience design principles, from wireframing to final implementation.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
    skills: ["HTML", "CSS", "JavaScript", "Vite"],
  },
];