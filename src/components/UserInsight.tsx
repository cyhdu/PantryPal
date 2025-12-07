// @ts-nocheck

import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderProfile from "./HeaderProfile";
import "./UserInsight.css";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api";

export default function UserInsight() {
  const [ingredient, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [budget, setBudget] = useState([]); // Budget API not implemented yet, leaving as empty

  const location = useLocation();
  // Fallback to localStorage if state is lost (e.g. refresh)
  const userId = location.state?.userId || localStorage.getItem("userId");
  
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userRes = await api.get(`/users/${userId}`);
          setUserName(userRes.data.username);
        }

        const [invRes, recipeRes] = await Promise.all([
          api.get("/inventory"),
          api.get("/recipes")
        ]);

        setIngredient(invRes.data);
        setRecipe(recipeRes.data);

      } catch (err) {
        console.error("Error loading insights", err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT SECTION */}
      <div className="flex-1 min-h-screen bg-[#fafafa]">
        {/* TOP NAV BAR */}
        <HeaderProfile userName={userName} />
        {/* YOUR PAGE CONTENT */}
        <div className="user-insight">
          <h1 className="insight-title">User Insight</h1>
          <div className="insight-grid">
            <div className="insight-item">
              <h3>Pantry Usage</h3>
              <div className="container">
                {ingredient.length === 0 ? (
                  <div className="empty-state">
                    <p>No ingredients yet! Click the button to add.</p>
                    <Link to="/inventory" className="add-button">
                      ADD
                    </Link>
                  </div>
                ) : (
                  <ul className="ingredient-list w-full px-8 py-4 space-y-2">
                    {ingredient.slice(0, 5).map((item, index) => (
                      <li key={index} className="flex justify-between border-b py-1">
                        <span>{item.name}</span>
                        <span className="text-gray-500">{item.quantity} {item.unit}</span>
                      </li>
                    ))}
                    {ingredient.length > 5 && <li className="text-center text-xs text-gray-400">...and {ingredient.length - 5} more</li>}
                  </ul>
                )}
              </div>
            </div>
            <div className="insight-item">
              <h3>Recipe Gallery</h3>
              <div className="container">
                {recipe.length === 0 ? (
                  <div className="empty-state">
                    <p>No recipes yet! Click the button to add.</p>
                    <Link to="/recipes" className="add-button">
                      ADD
                    </Link>
                  </div>
                ) : (
                  <ul className="recipe-list w-full px-8 py-4 space-y-2">
                    {recipe.slice(0, 5).map((r, index) => (
                      <li key={index} className="flex justify-between border-b py-1">
                        <span>{r.name}</span>
                        <span className="text-gray-500">{r.calories} kcal</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="insight-item">
              <h3>Budget Overview</h3>
              <form className="container">
                <div className="empty-state">
                   <p>Budget feature coming soon!</p>
                   {/* 
                   <Link to="/settings/budget" className="add-button">
                     ADD
                   </Link>
                   */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}