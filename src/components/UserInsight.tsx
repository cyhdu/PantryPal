// @ts-nocheck

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderProfile from "./HeaderProfile";
import "./UserInsight.css";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api";
import useAuthGuard from "./useAuthGuard";

export default function UserInsight() {
  const [ingredient, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState([]);
  // budget is an object or null, not an array
  const [budget, setBudget] = useState(null);

  const location = useLocation();
  // Fallback to localStorage if state is lost (e.g. refresh)
  const userId = location.state?.userId || localStorage.getItem("userId");

  const [userName, setUserName] = useState("User");

  useAuthGuard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userRes = await api.get(`/users/${userId}`);
          setUserName(userRes.data.username);
        }

        const [invRes, recipeRes] = await Promise.all([
          api.get("/inventory"),
          api.get("/recipes"),
        ]);

        setIngredient(invRes.data);
        setRecipe(recipeRes.data);

        // Read budget from localStorage
        const saved = localStorage.getItem("budget");
        if (saved) {
          setBudget(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Error loading insights", err);
      }
    };

    fetchData();
  }, [userId]);

  const getDaysUntilExpiry = (dateStr) => {
    if (!dateStr) return 999;
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const expiringItems = ingredient
    .filter((item) => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days <= 3;
    })
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  // Helper to calculate days until expiry (for badge style)
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
    <div className="flex-1 h-screen flex flex-col overflow-hidden bg-[#F7F5EF]">
      {/* TOP NAV BAR */}
      <HeaderProfile userName={userName} />

      {/* YOUR PAGE CONTENT */}
      <div className="user-insight">
        <h1 className="insight-title">User Insight</h1>

        <div className="insight-grid">
          {/* PANTRY USAGE */}
          {/* PANTRY USAGE */}
          <div className="insight-item">
            <h3>Pantry Usage</h3>
            {ingredient.length > 0 && (
              <p className="text-sm text-gray-600 mb-2 ml-4">
                You have{" "}
                <span className="font-semibold">{ingredient.length}</span>{" "}
                stored ingredients.
              </p>
            )}
            {ingredient.length === 0 ? (
              <div className="empty-state w-full h-full flex flex-col justify-center items-center flex-1">
                <p>No ingredients yet! Click the button to add.</p>
                <Link to="/inventory" className="add-button">
                  ADD
                </Link>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto px-2 py-2 space-y-3">
                {/* Ingredient names */}
                <div className="flex flex-col gap-2">
                  {ingredient.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                    >
                      <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}

                  {ingredient.length > 5 && (
                    <div className="text-xs text-gray-400 text-center">
                      ...and {ingredient.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RECIPE GALLERY */}
          {/* RECIPE GALLERY */}
          <div className="insight-item">
            <h3>Recipe Gallery</h3>
            {recipe.length > 0 && (
              <p className="text-sm text-gray-600 mb-2 ml-4">
                You have{" "}
                <span className="font-semibold">{recipe.length}</span>{" "}
                stored recipes.
              </p>
            )}
            {recipe.length === 0 ? (
              <div className="empty-state w-full h-full flex flex-col justify-center items-center flex-1">
                <p>No recipes yet! Click the button to add.</p>
                <Link to="/recipes" className="add-button">
                  ADD
                </Link>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto px-2 py-2 space-y-3">
                {/* Recipe Names */}
                <div className="flex flex-col gap-2">
                  {recipe.slice(0, 5).map((r, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                    >
                      <span className="font-medium text-gray-800 text-sm">{r.name}</span>
                    </div>
                  ))}

                  {recipe.length > 5 && (
                    <div className="text-xs text-gray-400 text-center">
                      ...and {recipe.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expiring Items */}
          {/* Expiring Items */}
          <div className="insight-item">
            <h3>Expiring Items</h3>
            {expiringItems.length > 0 && (
              <p className="text-sm text-gray-600 mb-2 ml-4">
                You have{" "}
                <span className="font-semibold text-red-600">
                  {expiringItems.length}
                </span>{" "}
                items expiring soon.
              </p>
            )}
            {expiringItems.length === 0 ? (
              <div className="empty-state w-full h-full flex flex-col justify-center items-center flex-1">
                <p className="text-lg font-semibold text-[#39712e]">
                  No items expiring soon!
                </p>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto px-2 py-2 space-y-3">
                <div className="flex flex-col gap-2">
                  {expiringItems.slice(0, 5).map((item, index) => {
                    const badge = getExpiryBadge(item.expiryDate);

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                          <span className="text-xs text-gray-500">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                        {badge && (
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-sm ${badge.color}`}>
                            {badge.text}
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {expiringItems.length > 5 && (
                    <div className="text-xs text-gray-400 text-center">
                      ...and {expiringItems.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
