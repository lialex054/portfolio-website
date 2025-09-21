import GlassesFollower from "@/components/GlassesFollower";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <GlassesFollower />

      <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
      <p className="max-w-xl text-center text-gray-300 mb-6">
        Hi, I’m Alex — a design engineering student passionate about building
        products that merge technical craft with user-focused design.
      </p>
      <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
        My Projects
      </button>
    </main>
  );
}
