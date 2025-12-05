import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";

const topUsed = ["Rice", "Chicken Breast", "Broccoli", "Garlic"];

export default function InsightsPage() {
  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8">
        <h1 className="text-2xl font-semibold text-[#FF8A00] mb-8">
          Insights Summary
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
          {/* Pantry Usage */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#eeeeee] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-[#333333]">Pantry Usage</h2>
              <button className="text-xs text-[#FF8A00] font-medium">
                Edit
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#3a6330] mb-2">
                Top Used
              </p>
              <ul className="space-y-2 text-sm">
                {topUsed.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center justify-between bg-[#F8F7F2] rounded-xl px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-white border border-[#e6e6e6] flex items-center justify-center text-xs font-semibold text-gray-600">
                        {idx + 1}
                      </span>
                      <span className="text-gray-800">{item}</span>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-xs">
              <p className="text-gray-500">Avg. Restock Time</p>
              <p className="font-semibold text-[#FF5C35]">7–10 days</p>
            </div>

            <div className="mt-auto">
              <div className="mt-4 rounded-xl bg-[#FFC54D] px-4 py-3 text-xs font-medium text-[#5a3b00]">
                Consider buying vegetables and meat
              </div>
            </div>
          </section>

          {/* Diet Preference */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#eeeeee] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-[#333333]">
                Diet Preference
              </h2>
              <button className="text-xs text-[#FF8A00] font-medium">
                Edit
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["High Protein", "Quick Meal", "Asian Cuisine"].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-[#FF8A00] text-white text-xs font-semibold"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-xs mt-3">
              <div>
                <p className="text-gray-500 mb-1">Target Calorie (kcal)</p>
                <input
                  type="text"
                  defaultValue="2000"
                  className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:ring-2 focus:ring-[#FF8A00]/40"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-gray-500 mb-1">Health Concerns</p>
                  <select className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white">
                    <option>low-sodium</option>
                  </select>
                </div>
                <div>
                  <select className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white">
                    <option>low-sugar</option>
                  </select>
                </div>
                <div>
                  <select className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white">
                    <option>Concerns</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Budget Overview */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#eeeeee] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-[#333333]">
                Budget Overview
              </h2>
              <button className="text-xs text-[#FF8A00] font-medium">
                Edit
              </button>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>$0</span>
                <span>$22.5/300</span>
              </div>
              <div className="relative h-2 rounded-full bg-[#F1E4D0]">
                <div className="absolute left-0 top-0 h-full bg-[#FF8A00] w-1/4 rounded-full" />
              </div>
              <p className="mt-2 text-xs text-gray-500">Monthly budget</p>
            </div>

            {/* Text stats */}
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-gray-500">Current spend</p>
                <p className="font-semibold text-gray-800">
                  $22.5 <span className="text-gray-500">7.5% from month</span>
                </p>
              </div>

              <div>
                <p className="text-gray-500">Most Expensive:</p>
                <div className="mt-1 w-full rounded-lg bg-[#F4F4F4] px-3 py-2 text-xs font-medium text-gray-700">
                  Meat Purchases
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="rounded-lg bg-[#22C55E] px-4 py-3 text-xs font-semibold text-white">
                Alert: You&apos;re on track to your budget!
              </div>
            </div>
          </section>
        </div>
      </main>
    </ScaleWrapper>
  );
}
