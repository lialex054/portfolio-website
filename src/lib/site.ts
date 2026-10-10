// Site-wide details. Edit here, not in components.

export const site = {
  name: "Alex Li",
  // Set NEXT_PUBLIC_SITE_URL to the live domain so social previews resolve.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "I turn messy problems into products people use.",
  credentials: "Associate Product Manager at Ebury · Design Engineering, Imperial · ex-Revolut",
  description:
    "Alex Li — product manager with a design engineering background. Case studies in product, UX and building.",
  email: "lialex054@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexli429",
  cv: "https://www.dropbox.com/scl/fi/51puv4bvnqcn5n0gcg3pj/alexcv_2026_PM.pdf?rlkey=3qjapbki20a4p5lazg61ovtg0&st=bgkzkw50&dl=0",
};

export const about = {
  portrait: "/work/about/portrait.webp",
  lead: "I'm a product manager with a design engineering background.",
  // TODO: 2–3 sentences on what you care about, how you work and what you're looking for next.
  bio: "",
  experience: [
    { org: "Ebury", role: "Associate Product Manager", dates: "Jul 2026 – present" },
    { org: "Revolut", role: "Product Design Intern", dates: "Jul–Sep 2025" },
    { org: "KAIKAKU", role: "Freelance trailer & 3D", dates: "May–Jun 2025" },
    { org: "Imperial College London", role: "MEng Design Engineering, First-Class Honours", dates: "2022–2026" },
  ],
};

// Shown as a "coming soon" tile while these case studies are being written.
export const upcoming = ["Daybreak", "Domo", "Master's thesis on LLMs and designer empathy"];

// Engineering work kept as a text-only list below the grid.
export const archive = [
  {
    name: "HIVE-FU",
    kind: "Speculative design engineering",
    year: "2025",
    url: "https://www.dropbox.com/scl/fi/4lgg4xbvrr9c6ghiu1uwq/Group14-HIVEFU.pdf?rlkey=hnap7uc11ufwp4ljlp3wwwg9s&st=yi17dz0e&dl=0",
  },
  {
    name: "FEA: Hip Prosthetic",
    kind: "Finite element analysis",
    year: "2024",
    url: "https://www.dropbox.com/scl/fi/74epyefxguctdtmzrs5ow/hip-implant-report.pdf?rlkey=1hatuvuxn5b6mwky4sogx35f4&e=1&st=pcv5ebii&dl=0",
  },
  {
    name: "CFD: Corvette",
    kind: "Computational fluid dynamics",
    year: "2024",
    url: "https://www.dropbox.com/scl/fi/eu9zs65n5ktcwbrpb0kxu/1958-chevrolet-corvette-cfd.pdf?rlkey=1yg80u98r9yb99ue8bablfi79&e=1&st=dcwojkbm&dl=0",
  },
  {
    name: "Pulsar",
    kind: "Physical computing",
    year: "2023",
    url: "https://www.dropbox.com/scl/fi/gy18255scvzbtqetf80vh/Gizmo-Portfolio.pdf?rlkey=l2j1ztfitteevrxaarodjyq6k&e=1&st=7l9jpve5&dl=0",
  },
];

export const disciplines = [
  { id: "product", label: "Product" },
  { id: "ux", label: "UX" },
  { id: "build", label: "Build" },
  { id: "story", label: "Storytelling" },
] as const;

export type DisciplineId = (typeof disciplines)[number]["id"];
