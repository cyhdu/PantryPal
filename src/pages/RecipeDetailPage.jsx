import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import api from "../services/api";
import { toast } from "react-toastify";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // User name state
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (id) {
      fetchData(id);
      fetchUserName();
    }
  }, [id]);

  // Fetch username
  const fetchUserName = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserName("User"); // Fallback
      }
    }
  };

  const fetchData = async (recipeId) => {
    try {
      const [recipeRes, inventoryRes] = await Promise.all([
        api.get(`/recipes/${recipeId}`),
        api.get("/inventory")
      ]);
      setRecipe(recipeRes.data);
      setInventory(inventoryRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
      navigate("/recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToShoppingList = async (item) => {
    try {
      await api.post("/shopping-list/items", { 
        name: item.name, 
        amount: item.quantity 
      });
      toast.success(`Added ${item.name} to list`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    }
  };

  if (loading) {
    return (
      <ScaleWrapper>
        <HeaderProfile userName={userName} />
        <div className="px-10 py-8">Loading...</div>
      </ScaleWrapper>
    );
  }

  if (!recipe) {
    return (
      <ScaleWrapper>
        <HeaderProfile userName={userName} />
        <div className="px-10 py-8">Recipe not found</div>
      </ScaleWrapper>
    );
  }

  // Compare recipe ingredients with inventory
  const haveIngredients = [];
  const needIngredients = [];

  if (recipe.ingredients) {
    recipe.ingredients.forEach(rIng => {
      // Case-insensitive matching
      const match = inventory.find(
        i => i.name.trim().toLowerCase() === rIng.name.trim().toLowerCase()
      );
      if (match) {
        haveIngredients.push(rIng);
      } else {
        needIngredients.push(rIng);
      }
    });
  }

  return (
    <ScaleWrapper>
      <HeaderProfile userName={userName} />

      <main className="px-10 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-[#FF8A00]">
            {recipe.name}
            </h1>
            <button onClick={() => navigate("/recipes")} className="text-sm text-gray-500 hover:underline">
                Back to Recipes
            </button>
        </div>

        <section className="flex flex-col lg:flex-row gap-8">
          {/* <div className="w-40 h-32 flex-shrink-0 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Image</span>
          </div> */}

          <div className="flex-1">
            <p className="text-sm text-gray-600 max-w-xl mb-4 italic">
              {recipe.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold mb-6">
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                {recipe.priceEstimate}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                {recipe.prepTime}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                {recipe.calories} Cal
              </span>
              {recipe.tags && recipe.tags.filter(t => t).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#FF8A00] text-white">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
              <div className="space-y-6">
                
                {/* What you have */}
                <div>
                    <h2 className="font-semibold text-[#39712e] text-lg mb-2">What you have</h2>
                    {haveIngredients.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {haveIngredients.map((ing, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-[#22C55E]">✓</span>
                                    <span className="line-through text-gray-500">{ing.quantity} {ing.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-xs">You don't have any ingredients for this recipe yet.</p>
                    )}
                </div>

                {/* What you need */}
                <div>
                    <h2 className="font-semibold text-[#E87524] text-lg mb-2">What you need</h2>
                    {needIngredients.length > 0 ? (
                        <ul className="space-y-2">
                            {needIngredients.map((ing, idx) => (
                                <li key={idx} className="flex items-center justify-between bg-red-50 p-2 rounded-md border border-red-100">
                                    <span className="text-gray-800">{ing.quantity} {ing.name}</span>
                                    <button 
                                        onClick={() => handleAddToShoppingList(ing)}
                                        className="text-xs bg-[#FF8A00] text-white px-2 py-1 rounded hover:bg-[#e67900] transition"
                                    >
                                        + List
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[#22C55E] font-medium">You have everything!</p>
                    )}
                </div>
                
                {/* Nutrition */}
                <div>
                  <h2 className="font-semibold text-[#39712e] text-lg mb-2">Nutrition</h2>
                  <ul className="space-y-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <li>Calories: {recipe.calories} kcal</li>
                    <li>Protein: {recipe.nutrition?.protein || "0g"}</li>
                    <li>Fat: {recipe.nutrition?.fat || "0g"}</li>
                    <li>Carbs: {recipe.nutrition?.carbs || "0g"}</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold text-[#39712e] text-lg">Instructions</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No instructions provided</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ScaleWrapper>
  );
}
