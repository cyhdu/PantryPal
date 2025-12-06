import { useNavigate } from "react-router-dom";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import AppSettings from "../components/AppSettings";

export default function BudgetPage() {
  const navigate = useNavigate();

  return (
    <ScaleWrapper>
      <HeaderProfile />

      {/* Dim background */}
      <div className="relative">
        <div className="pointer-events-none opacity-30">
          <AppSettings />
        </div>

        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => navigate("/settings")}
        />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-8 relative">
            {/* X close button */}
            <button
              onClick={() => navigate("/settings")}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            <h1 className="text-2xl font-semibold text-[#39712e] text-center mb-6">
              Budget &amp; Spending
            </h1>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Saving Reminder</p>
                <select className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3 bg-white">
                  <option>Once Per Week</option>
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Monthly Food Budget</p>
                <input className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3" />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Currency</p>
                <select className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3 bg-white">
                  <option>US Dollar</option>
                </select>
              </div>
            </div>

            {/* DONE BUTTON */}
            <button
              onClick={() => navigate("/settings")}
              className="mt-8 w-full h-10 rounded-lg bg-[#FF8A00] text-white font-semibold text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </ScaleWrapper>
  );
}
