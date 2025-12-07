import { useState, useEffect } from "react";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", amount: "" });

  // User name state
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchData();
    fetchUserName();
  }, []);

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

  const fetchData = async () => {
    try {
      const [listRes, invRes] = await Promise.all([
        api.get("/shopping-list"),
        api.get("/inventory")
      ]);
      setShoppingList(listRes.data.items || []);
      setInventory(invRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/shopping-list/items", newItem);
      setShoppingList(res.data.items);
      setShowModal(false);
      setNewItem({ name: "", amount: "" });
      toast.success("Item added");
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  const handleToggleCheck = async (itemId, currentStatus) => {
    try {
      const res = await api.put(`/shopping-list/items/${itemId}`, { isChecked: !currentStatus });
      setShoppingList(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const res = await api.delete(`/shopping-list/items/${itemId}`);
      setShoppingList(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };
  
  // Helper to calculate days until expiry (reused from InventoryPage logic)
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
      <HeaderProfile userName={userName} />

      <main className="px-10 py-8 flex gap-8 max-w-6xl">
        {/* Left list */}
        <section className="w-80 bg-white rounded-2xl shadow-sm border border-[#eeeeee] p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#FF8A00] mb-4">
              Shopping List
            </h1>

            <ul className="space-y-2 text-sm">
              {shoppingList.length === 0 && <p className="text-gray-400">List is empty.</p>}

              {shoppingList.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between text-gray-700 group"
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={item.isChecked} 
                      onChange={() => handleToggleCheck(item._id, item.isChecked)}
                      className="accent-[#FF8A00] cursor-pointer" 
                    />
                    <span className={item.isChecked ? "line-through text-gray-400" : ""}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{item.amount}</span>
                    <button onClick={() => handleDeleteItem(item._id)} className="opacity-0 group-hover:opacity-100 text-red-400">×</button>
                  </div>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setShowModal(true)}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-[#FF8A00] hover:underline"
            >
              <span className="text-lg">+</span> Add new item
            </button>
          </div>

          {/* <div className="border-t border-[#eeeeee] mt-6 pt-4">
            <p className="text-xs text-gray-500 mb-1">Estimated Total</p>
            <p className="text-2xl font-semibold text-[#FF5C35]">$0.00</p>
          </div> */}
        </section>

        {/* Right inventory column (Real Data) */}
        <section className="flex-1 bg-[#F4F2EA] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3b3b3b]">
              Your Ingredients
            </h2>
            {/* Buttons hidden for now as functionality is on InventoryPage */}
          </div>

          <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
             {inventory.length === 0 && <p className="text-gray-500">Pantry is empty.</p>}

             {inventory.map((item) => {
               const badge = getExpiryBadge(item.expiryDate);
               return (
                <div key={item._id} className="flex items-center gap-4 rounded-2xl bg-white shadow-sm border border-[#eeeeee] px-5 py-4">
                  {/* <div className="w-24 h-20 rounded-xl bg-[#F5F5F5] border border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-400">Img</span>
                  </div> */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#333333]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity} {item.unit} &nbsp;&nbsp; Category: {item.category}
                    </p>
                  </div>
                   {badge && (
                    <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white ${badge.color}`}>
                      {badge.text}
                    </span>
                  )}
                </div>
               );
             })}
          </div>
        </section>
      </main>

       {/* Add Item Modal */}
       {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <form onSubmit={handleAddItem} className="space-y-3">
              <input 
                className="w-full border p-2 rounded" 
                placeholder="Item Name" 
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                required
              />
               <input 
                className="w-full border p-2 rounded" 
                placeholder="Amount (e.g. 1 bag)" 
                value={newItem.amount}
                onChange={e => setNewItem({...newItem, amount: e.target.value})}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#FF8A00] text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ScaleWrapper>
  );
}
