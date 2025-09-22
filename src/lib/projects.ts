export interface Project {
  slug: string;
  name: string;
  module: string;
  date: string;
  description: string;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "project-name-one",
    name: "PULSAR",
    module: "MODULE NAME",
    date: "October 2025 - December 2025",
    description:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing tincidunt sapien nec habitant morbi tristique augue cursus. Lacus enim varius hendrerit et sem tellus ac quis a. Tellus integer lorem dui feugiat. Adipiscing tincidunt condimentum nisl quisque ipsum ut urna.",
    images: ["p1_large.jpg", "p1_small1.jpg", "p1_small2.jpg", "p1_small3.jpg", "p1_small4.jpg"],
  },
  {
    slug: "project-name-two",
    name: "Cyclogic",
    module: "ANOTHER MODULE",
    date: "August 2025 - September 2025",
    description:
      "This is a description for the second project. It showcases different skills and challenges overcome during development.",
    images: ["p2_large.jpg", "p2_small1.jpg", "p2_small2.jpg", "p2_small3.jpg", "p2_small4.jpg"],
  },
  {
    slug: "project-name-three",
    name: "HIVE-FU",
    module: "DESIGN MODULE",
    date: "June 2025 - July 2025",
    description:
      "This project focused heavily on user interface and user experience design principles, from wireframing to final implementation.",
    images: ["p3_large.jpg", "p3_small1.jpg", "p3_small2.jpg", "p3_small3.jpg", "p3_small4.jpg"],
  },
  // Add more projects as needed
];