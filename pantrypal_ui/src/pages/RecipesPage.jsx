import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";

const recipes = [
  {
    name: "Spaghetti Carbonara",
    time: "20 min",
    calories: "250 Cal",
    price: "$$",
    tag: "Meat"
  },
  {
    name: "Chicken Stir-Fry",
    time: "15 min",
    calories: "300 Cal",
    price: "$",
    tag: "Meat"
  }
];

export default function RecipesPage() {
  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8">
        <h1 className="text-2xl font-semibold text-[#FF8A00] mb-6">
          Recipes
        </h1>

        <div className="flex flex-col gap-4 max-w-3xl">
          {recipes.map((r) => (
            <article
              key={r.name}
              className="flex items-start gap-4 w-full rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4"
            >
              <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#333333]">
                      {r.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 max-w-md">
                      Body text for whatever you&apos;d like to say. Add main
                      takeaway points, quotes, anecdotes, or even a very very
                      short story.
                    </p>
                  </div>
                  <div className="flex gap-3 text-gray-400 text-sm">
                    <button>✏️</button>
                    <button>🗑</button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.price}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.time}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.calories}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.tag}
                  </span>
                </div>
              </div>
            </article>
          ))}

          <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#FF8A00] hover:underline">
            <span className="text-lg">+</span> Add new recipe
          </button>
        </div>
      </main>
    </ScaleWrapper>
  );
}
