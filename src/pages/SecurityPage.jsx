import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";

export default function SecurityPage() {
  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8 max-w-5xl">
        <h1 className="text-2xl font-semibold text-[#FF8A00] mb-6">
          Chicken Stir-Fry
        </h1>

        <section className="flex gap-8">
          <div className="w-40 h-32 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Image</span>
          </div>

          <div className="flex-1">
            <p className="text-xs text-gray-500 max-w-xl mb-4">
              Body text for whatever you&apos;d like to say. Add main takeaway
              points, quotes, anecdotes, or even a very very short story.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold mb-6">
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                $
              </span>
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                15 min
              </span>
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                300 Cal
              </span>
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                Meat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
              <div className="space-y-2">
                <h2 className="font-semibold text-[#39712e]">What you have</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>1 chicken breast</li>
                  <li>2 head broccoli</li>
                  <li>2 tbsp soy sauce</li>
                  <li>2 cloves garlic</li>
                  <li>1 cup rice</li>
                </ul>
              </div>

              <div className="space-y-2 md:col-span-1">
                <h2 className="font-semibold text-[#39712e]">Instructions</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Cook rice according to package directions</li>
                  <li>Cut chicken and vegetables into bite-sized pieces</li>
                  <li>Stir-fry chicken until cooked through</li>
                  <li>Add vegetables and stir-fry</li>
                  <li>Add soy sauce, ginger, and garlic</li>
                  <li>Serve over rice</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-[#39712e]">
                    What you need
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>1 carrot</li>
                    <li>1 inch ginger</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-semibold text-[#39712e]">Nutrition</h2>
                  <ul className="space-y-1 text-gray-700">
                    <li>Calories: 500 kcal</li>
                    <li>Protein: 40g</li>
                    <li>Fat: 15g</li>
                    <li>Carbs: 50g</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold text-[#39712e] mb-1">
                Substitution
              </h2>
              <p className="text-sm text-gray-700">
                You can use any vegetables you have on hand.
              </p>
            </div>
          </div>
        </section>
      </main>
    </ScaleWrapper>
  );
}
