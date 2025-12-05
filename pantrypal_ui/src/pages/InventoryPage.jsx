import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";

const ingredients = [
  {
    name: "Chicken Breast",
    category: "meat",
    calories: 165,
    recipes: 5,
    badge: "3 Days",
    badgeColor: "bg-[#F04438]"
  },
  {
    name: "Rice",
    category: "grain",
    calories: 130,
    recipes: 3,
    badge: "1 Week",
    badgeColor: "bg-[#FDB022]"
  },
  {
    name: "Broccoli",
    category: "vegetable",
    calories: 31,
    recipes: 4,
    badge: "2 Weeks",
    badgeColor: "bg-[#12B76A]"
  }
];

export default function InventoryPage() {
  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#FF8A00]">Ingredients</h1>
          <div className="flex items-center gap-4 text-[#FF8A00]">
            <button className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition">
              +
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition">
              ⌕
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">All</p>

        <div className="flex flex-col gap-4 max-w-3xl">
          {ingredients.map((item) => (
            <article
              key={item.name}
              className="flex items-center gap-4 w-full rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4"
            >
              {/* Image placeholder */}
              <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div>

              <div className="flex-1">
                <h2 className="text-base font-semibold text-[#333333]">
                  {item.name}
                </h2>
                <div className="mt-1 flex flex-wrap gap-6 text-xs text-gray-500">
                  <span>
                    category:{" "}
                    <span className="font-medium text-gray-700">
                      {item.category}
                    </span>
                  </span>
                  <span>
                    calorie:{" "}
                    <span className="font-medium text-gray-700">
                      {item.calories} kcal
                    </span>
                  </span>
                  <span>
                    #of recipes:{" "}
                    <span className="font-medium text-gray-700">
                      {item.recipes}
                    </span>
                  </span>
                </div>
              </div>

              <div className="self-start">
                <span
                  className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </ScaleWrapper>
  );
}
