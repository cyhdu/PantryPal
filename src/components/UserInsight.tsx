// @ts-nocheck

import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderProfile from "./HeaderProfile";
import "./UserInsight.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function UserInsight() {
  const [ingredient, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [budget, setBudget] = useState([]);

  // 🔥 FIX — get username from login navigation
  const location = useLocation();
  const userId = location.state?.userId;
  const email = location.state?.email;

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:3000/api/users/${userId}`)
      .then((res) => {
        setUserName(res.data.username);
      })
      .catch((err) => {
        console.log("Error fetching username", err);
      });
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
                  <ul className="ingredient-list">
                    {ingredient.slice(0, 5).map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
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
                  <ul className="recipe-list">
                    {recipe.slice(0, 5).map((recipe, index) => (
                      <li key={index}>{recipe.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="insight-item">
              <h3>Budget Overview</h3>
              <form className="container">
                <p>No budget yet! Click the button to add.</p>
                <Link to="/settings/budget" className="add-button">
                  ADD
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
