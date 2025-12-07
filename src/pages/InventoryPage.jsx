import { useState, useEffect } from "react";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function InventoryPage() {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: "",
    category: "other",
    quantity: 1,
    unit: "pc",
    calories: 0,
    expiryDate: "",
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...ingredients].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "All") {
      result = result.filter(item =>
        item.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    setFilteredIngredients(result);
  }, [ingredients, searchTerm, filterCategory]);

  const fetchIngredients = async () => {
    try {
      const res = await api.get("/inventory");
      setIngredients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/inventory/${id}`);
      setIngredients((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/inventory", formData);
      setIngredients([res.data, ...ingredients]);
      setShowModal(false);
      setFormData({ name: "", category: "other", quantity: 1, unit: "pc", calories: 0, expiryDate: "" });
      toast.success("Ingredient added");
    } catch (err) {
      toast.error("Failed to add ingredient");
    }
  };

  // Function to navigate to RecipesPage with ingredient name
  const handleFindRecipes = (ingredientName) => {
    navigate('/recipes', { state: { ingredientSearch: ingredientName } });
  };

  // Helper to calculate days until expiry
  const getExpiryBadge = (dateStr) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return { text: "Expired", color: "bg-gray-500" };
    if (days <= 3) return { text: `${days} Days`, color: "bg-[#F04438]" };
    if (days <= 7) return { text: "1 Week", color: "bg-[#FDB022]" };
    return { text: "> 1 Week", color: "bg-[#12B76A]" };
  };

  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8 relative">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#FF8A00]">Ingredients</h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] text-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition"
            >
              +
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search ingredients..."
              className="flex-1 h-10 rounded-lg border border-[#e2e2e2] px-4 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="h-10 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="meat">Meat</option>
              <option value="grain">Grain</option>
              <option value="dairy">Dairy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredIngredients.length === 0 && <p className="text-gray-500">No ingredients found.</p>}

          {filteredIngredients.map((item) => {
            const badge = getExpiryBadge(item.expiryDate);
            return (
              <article
                key={item._id}
                className="flex items-center gap-4 w-full rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4"
              >
                {/* <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Image</span>
                </div> */}

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-base font-semibold text-[#333333]">
                        {item.name} ({item.quantity} {item.unit})
                      </h2>
                      <div className="mt-1 flex flex-wrap gap-6 text-xs text-gray-500">
                        <span>
                          category: <span className="font-medium text-gray-700">{item.category}</span>
                        </span>
                        <span>
                          calorie: <span className="font-medium text-gray-700">{item.calories} kcal</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {badge && (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-gray-400 font-medium mb-0.5 uppercase tracking-wide">Expires in</span>
                          <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white shadow-sm ${badge.color}`}>
                            {badge.text}
                          </span>
                        </div>
                      )}

                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleFindRecipes(item.name)}
                          className="text-xs bg-[#22C55E] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#1f9d4e] transition shadow-sm flex items-center gap-1"
                        >
                          <span className="text-[10px]">🔍</span> Find Recipes
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-xs text-gray-400 px-2 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Add Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Ingredient</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      placeholder="Qty"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Unit</label>
                    <input
                      className="w-full border p-2 rounded"
                      placeholder="Unit (pc, kg)"
                      value={formData.unit}
                      onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Category</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="other">Other</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="meat">Meat</option>
                    <option value="grain">Grain</option>
                    <option value="dairy">Dairy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Calories</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    placeholder="e.g., 100"
                    value={formData.calories}
                    onChange={e => setFormData({ ...formData, calories: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={formData.expiryDate}
                    onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#FF8A00] text-white rounded hover:bg-[#e67900]">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </ScaleWrapper>
  );
}