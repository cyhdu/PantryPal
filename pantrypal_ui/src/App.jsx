import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import InventoryPage from "./pages/InventoryPage";
import RecipesPage from "./pages/RecipesPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import BudgetPage from "./pages/BudgetPage";
import ExpiryAlertsPage from "./pages/ExpiryAlertsPage";
import SecurityPage from "./pages/SecurityPage";

function App() {
  return (
    
      <div className="font-sans">
        <Sidebar />
        <Routes>
          <Route path="/settings/budget" element={<BudgetPage />} />
          <Route path="/settings/expiry-alerts" element={<ExpiryAlertsPage />} />
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/1" element={<SecurityPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/budget" element={<BudgetPage />} />
          <Route path="/settings/expiry-alerts" element={<ExpiryAlertsPage />} />
        </Routes>
      </div>
   
  );
}

export default App;
