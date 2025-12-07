import { useState, useEffect } from "react";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("");
  
  // New Numeric Filters
  const [timeFilter, setTimeFilter] = useState(""); // Max Prep Time
  const [calFilter, setCalFilter] = useState("");   // Max Calories

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prepTime: "15 min",
    calories: 200,
    priceEstimate: "$",
    tags: "",
    ingredients: [],
    instructions: [],
    nutrition: { protein: "", fat: "", carbs: "" }
  });

  const [tempIngredient, setTempIngredient] = useState({ name: "", quantity: "" });
  const [tempInstruction, setTempInstruction] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = recipes;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(lowerTerm) ||
        (r.ingredients && r.ingredients.some(ing => ing.name.toLowerCase().includes(lowerTerm)))
      );
    }

    if (priceFilter !== "All") {
      result = result.filter(r => r.priceEstimate === priceFilter);
    }

    if (tagFilter) {
      result = result.filter(r => 
        r.tags && r.tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }

    if (timeFilter) {
      // Assuming prepTime is stored like "15 min". We parse the number.
      result = result.filter(r => {
        const timeVal = parseInt(r.prepTime);
        return !isNaN(timeVal) && timeVal <= parseInt(timeFilter);
      });
    }

    if (calFilter) {
      result = result.filter(r => r.calories <= parseInt(calFilter));
    }

    setFilteredRecipes(result);
  }, [recipes, searchTerm, priceFilter, tagFilter, timeFilter, calFilter]);

  // Handle incoming ingredient search from inventory page
  useEffect(() => {
    if (location.state && location.state.ingredientSearch) {
      const term = location.state.ingredientSearch.toLowerCase();
      setSearchTerm(term); 
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);


  const fetchRecipes = async () => {
    try {
      const res = await api.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes(prev => prev.filter(r => r._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Can only delete your own recipes");
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      name: recipe.name,
      description: recipe.description || "",
      prepTime: recipe.prepTime,
      calories: recipe.calories,
      priceEstimate: recipe.priceEstimate,
      tags: recipe.tags ? recipe.tags.join(", ") : "",
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutrition: recipe.nutrition || { protein: "", fat: "", carbs: "" }
    });
    setEditingId(recipe._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ 
        name: "", description: "", prepTime: "15 min", calories: 200, priceEstimate: "$", tags: "",
        ingredients: [], instructions: [], nutrition: { protein: "", fat: "", carbs: "" }
      });
    setIsEditing(false);
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
      };

      let res;
      if (isEditing) {
        res = await api.put(`/recipes/${editingId}`, payload);
        setRecipes(prev => prev.map(r => r._id === editingId ? res.data : r));
        toast.success("Recipe updated");
      } else {
        res = await api.post("/recipes", payload);
        setRecipes([res.data, ...recipes]);
        toast.success("Recipe added");
      }
      
      resetForm();
    } catch (err) {
      toast.error("Failed to save recipe");
    }
  };

  const addIngredient = () => {
    if (!tempIngredient.name) return;
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, tempIngredient]
    }));
    setTempIngredient({ name: "", quantity: "" });
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    if (!tempInstruction) return;
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, tempInstruction]
    }));
    setTempInstruction("");
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  return (
    <ScaleWrapper>
      <HeaderProfile />

      <main className="px-10 py-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#FF8A00]">
              Recipes
            </h1>
            <button 
              onClick={() => { resetForm(); setShowModal(true); }}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF8A00] text-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition"
            >
              +
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-4 flex-wrap items-center">
            <input
              type="text"
              placeholder="Search recipes..."
              className="flex-1 min-w-[200px] h-10 rounded-lg border border-[#e2e2e2] px-4 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Filters */}
            <select
              className="h-10 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#FF8A00] bg-white cursor-pointer"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="All">Price: Any</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>

            <input
              type="number"
              placeholder="Max Time (min)"
              className="w-28 h-10 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Cal"
              className="w-24 h-10 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={calFilter}
              onChange={(e) => setCalFilter(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tag..."
              className="w-24 h-10 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#FF8A00] bg-white"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredRecipes.length === 0 && <p className="text-gray-500">No recipes found.</p>}

          {filteredRecipes.map((r) => (
            <article
              key={r._id}
              className="flex items-start gap-4 w-full rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4 cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/recipes/${r._id}`)}
            >
              {/* <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div> */}

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#333333]">
                      {r.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 max-w-md line-clamp-2">
                      {r.description || "No description."}
                    </p>
                  </div>
                  {/* Only show actions if user owns the recipe */}
                  {r.author === currentUserId && (
                    <div className="flex gap-2 text-gray-400 text-sm" onClick={e => e.stopPropagation()}>
                      <button onClick={() => handleEdit(r)} className="hover:text-[#FF8A00]">✏️</button>
                      <button onClick={() => handleDelete(r._id)} className="hover:text-red-500">🗑</button>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.priceEstimate}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.prepTime}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white">
                    {r.calories} Cal
                  </span>
                  {r.tags && r.tags.filter(t => t).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-[#FF8A00] text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Recipe" : "Add Recipe"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Basic Info */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Recipe Name</label>
                <input 
                  className="w-full border p-2 rounded" 
                  placeholder="Recipe Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Short Description</label>
                <textarea 
                  className="w-full border p-2 rounded" 
                  placeholder="Short Description" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                 <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Prep Time</label>
                    <input 
                      className="w-full border p-2 rounded" 
                      placeholder="e.g. 20 min" 
                      value={formData.prepTime}
                      onChange={e => setFormData({...formData, prepTime: e.target.value})}
                    />
                 </div>
                 <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Price Estimate</label>
                    <select 
                      className="w-full border p-2 rounded" 
                      value={formData.priceEstimate}
                      onChange={e => setFormData({...formData, priceEstimate: e.target.value})}
                    >
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                    </select>
                 </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tags</label>
                <input 
                  className="w-full border p-2 rounded" 
                  placeholder="Meat, Vegan (comma separated)" 
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                />
              </div>

              {/* Nutrition */}
              <div className="border-t pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nutrition</label>
                <div className="flex gap-2">
                    <div className="w-1/4">
                        <label className="block text-xs text-gray-500">Calories</label>
                        <input 
                            type="number"
                            className="w-full border p-2 rounded" 
                            value={formData.calories}
                            onChange={e => setFormData({...formData, calories: Number(e.target.value)})}
                        />
                    </div>
                    <div className="w-1/4">
                        <label className="block text-xs text-gray-500">Protein</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            placeholder="e.g. 20g"
                            value={formData.nutrition.protein}
                            onChange={e => setFormData({...formData, nutrition: {...formData.nutrition, protein: e.target.value}})}
                        />
                    </div>
                    <div className="w-1/4">
                        <label className="block text-xs text-gray-500">Carbs</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            placeholder="e.g. 50g"
                            value={formData.nutrition.carbs}
                            onChange={e => setFormData({...formData, nutrition: {...formData.nutrition, carbs: e.target.value}})}
                        />
                    </div>
                    <div className="w-1/4">
                        <label className="block text-xs text-gray-500">Fat</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            placeholder="e.g. 10g"
                            value={formData.nutrition.fat}
                            onChange={e => setFormData({...formData, nutrition: {...formData.nutrition, fat: e.target.value}})}
                        />
                    </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="border-t pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ingredients</label>
                <div className="flex gap-2 mb-2">
                    <input 
                        className="w-2/3 border p-2 rounded" 
                        placeholder="Ingredient Name" 
                        value={tempIngredient.name}
                        onChange={e => setTempIngredient({...tempIngredient, name: e.target.value})}
                    />
                    <input 
                        className="w-1/3 border p-2 rounded" 
                        placeholder="Qty (e.g 1 cup)" 
                        value={tempIngredient.quantity}
                        onChange={e => setTempIngredient({...tempIngredient, quantity: e.target.value})}
                    />
                    <button type="button" onClick={addIngredient} className="bg-gray-200 px-3 rounded hover:bg-gray-300">+</button>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                    {formData.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between bg-gray-50 p-1 rounded px-2">
                            <span>{ing.quantity} {ing.name}</span>
                            <button type="button" onClick={() => removeIngredient(i)} className="text-red-400 font-bold">×</button>
                        </li>
                    ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="border-t pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Instructions</label>
                <div className="flex gap-2 mb-2">
                    <textarea 
                        className="w-full border p-2 rounded" 
                        placeholder="Step description..." 
                        value={tempInstruction}
                        onChange={e => setTempInstruction(e.target.value)}
                    />
                    <button type="button" onClick={addInstruction} className="bg-gray-200 px-3 rounded hover:bg-gray-300 h-fit py-2">+</button>
                </div>
                <ol className="text-xs text-gray-600 space-y-1">
                    {formData.instructions.map((step, i) => (
                        <li key={i} className="flex justify-between bg-gray-50 p-1 rounded px-2">
                            <span>{i+1}. {step}</span>
                            <button type="button" onClick={() => removeInstruction(i)} className="text-red-400 font-bold">×</button>
                        </li>
                    ))}
                </ol>
              </div>
              
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#FF8A00] text-white rounded hover:bg-[#e67900]">{isEditing ? "Save Changes" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ScaleWrapper>
  );
}