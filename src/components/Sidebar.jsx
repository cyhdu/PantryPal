import { NavLink } from "react-router-dom";
import Logo from "../assets/pantrypal.png";

const navLinkBase =
  "flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors cursor-pointer";
const iconCircle =
  "flex items-center justify-center w-8 h-8 rounded-full border border-[#f0d9a9]";

const getNavClasses = ({ isActive }) =>
  `${navLinkBase} ${isActive
    ? "bg-[#FF8A00] text-white"
    : "text-[#3b3b3b] hover:bg-[#ffe1ba]"
  }`;

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#E6EDCC75] border-r border-[#E6EDCC75] flex flex-col justify-between">

      <div>
        <div className="flex items-center px-6 pt-6 pb-8">
          <img
            src={Logo}
            alt="PantryPal Logo"
            className="h-10 w-auto object-contain" />
        </div>

        <nav className="flex flex-col">
          <NavLink to="/inventory" className={getNavClasses}>
            <span className={iconCircle}>🍎</span>
            <span>Inventory</span>
          </NavLink>
          <NavLink to="/recipes" className={getNavClasses}>
            <span className={iconCircle}>📘</span>
            <span>Recipes</span>
          </NavLink>
          <NavLink to="/shopping-list" className={getNavClasses}>
            <span className={iconCircle}>🛒</span>
            <span>Shopping List</span>
          </NavLink>
          <NavLink to="/insight" className={getNavClasses}>
            <span className={iconCircle}>📊</span>
            <span>User Insights</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom nav */}
      <div className="pb-6">
        <NavLink to="/settings" className={getNavClasses}>
          <span className={iconCircle}>⚙️</span>
          <span>Settings</span>
        </NavLink>

        <button
          className="w-[calc(100%)] text-left"
          onClick={() => {
            // Clear all auth info
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("savedEmail");

            // Redirect to login
            window.location.href = "/login";
          }}
        >
          <div className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#c64b3b] hover:bg-[#ffe1ba] cursor-pointer">
            <span className={iconCircle}>⏏️</span>
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
