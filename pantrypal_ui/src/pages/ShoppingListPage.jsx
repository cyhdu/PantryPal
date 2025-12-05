import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";

const shoppingItems = [
  { name: "Chicken Breast", amount: "1 Pc" },
  { name: "Broccoli", amount: "2 Heads" },
  { name: "Garlic", amount: "4 Pc" },
  { name: "Rice", amount: "5 lb" }
];

export default function ShoppingListPage() {
  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8 flex gap-8 max-w-6xl">
        {/* Left list */}
        <section className="w-80 bg-white rounded-2xl shadow-sm border border-[#eeeeee] p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#FF8A00] mb-4">
              Shopping List
            </h1>

            <ul className="space-y-2 text-sm">
              {shoppingItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#FF8A00]" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-500">{item.amount}</span>
                </li>
              ))}
            </ul>

            <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#FF8A00] hover:underline">
              <span className="text-lg">+</span> Add new item
            </button>
          </div>

          <div className="border-t border-[#eeeeee] mt-6 pt-4">
            <p className="text-xs text-gray-500 mb-1">Estimated Total</p>
            <p className="text-2xl font-semibold text-[#FF5C35]">$22.50</p>
          </div>
        </section>

        {/* Right inventory column (reuse Inventory card style) */}
        <section className="flex-1 bg-[#F4F2EA] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3b3b3b]">
              Ingredients
            </h2>
            <div className="flex items-center gap-3 text-[#FF8A00]">
              <button className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition">
                +
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition">
                ⌕
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-3">All</p>

          <div className="flex flex-col gap-4 max-w-xl">
            {/* reusing static examples */}
            {/* You can import the same array from InventoryPage if you want */}
            <div className="flex items-center gap-4 rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4">
              <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#333333]">
                  Chicken Breast
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  category: meat&nbsp;&nbsp;&nbsp;calorie: 165 kcal&nbsp;&nbsp;&nbsp;recipes: 5
                </p>
              </div>
              <span className="inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white bg-[#F04438]">
                3 Days
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4">
              <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#333333]">Rice</h3>
                <p className="mt-1 text-xs text-gray-500">
                  category: grain&nbsp;&nbsp;&nbsp;calorie: 130 kcal&nbsp;&nbsp;&nbsp;recipes: 3
                </p>
              </div>
              <span className="inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white bg-[#FDB022]">
                1 Week
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4">
              <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#333333]">
                  Broccoli
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  category: vegetable&nbsp;&nbsp;&nbsp;calorie: 31 kcal&nbsp;&nbsp;&nbsp;recipes: 4
                </p>
              </div>
              <span className="inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white bg-[#22C55E]">
                2 Weeks
              </span>
            </div>
          </div>
        </section>
      </main>
    </ScaleWrapper>
  );
}
