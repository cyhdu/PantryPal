import { Link } from "react-router-dom";

const rowClasses =
  "flex items-center justify-between py-3 border-b border-[#e6e6e6] text-sm text-[#333] cursor-pointer hover:bg-[#faf7ef] transition";

export default function SettingsPreferences() {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold text-[#39712e] mb-2">
        Setting Preferences
      </h2>

      <div className="max-w-xl">
        {/* Budget */}
        <Link to="/settings/budget">
          <div className={rowClasses}>
            <span>Budget &amp; Spending</span>
            <span className="text-lg text-gray-400">&gt;</span>
          </div>
        </Link>

        {/* Expiry Alert */}
        <Link to="/settings/expiry-alerts">
          <div className={rowClasses}>
            <span>Expiry Alert</span>
            <span className="text-lg text-gray-400">&gt;</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
