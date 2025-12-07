// @ts-nocheck
import "./index.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import UserInsight from "./components/UserInsight";

import Sidebar from "./components/Sidebar";
import InventoryPage from "./pages/InventoryPage";
import RecipesPage from "./pages/RecipesPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import SettingsPage from "./pages/SettingsPage";
import BudgetPage from "./pages/BudgetPage";
import ExpiryAlertsPage from "./pages/ExpiryAlertsPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* ---------- PRIVATE ROUTES WITH SIDEBAR ---------- */}
        <Route
          path="/*"
          element={
            <div className="font-sans flex">
              <Sidebar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/signup" replace />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />
                  <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                  <Route path="/shopping-list" element={<ShoppingListPage />} />
                  <Route path="/insight" element={<UserInsight />} />

                  {/* Settings Section */}
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/settings/budget" element={<BudgetPage />} />
                  <Route
                    path="/settings/expiry-alerts"
                    element={<ExpiryAlertsPage />}
                  />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
