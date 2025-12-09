import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import AppSettings from "../components/AppSettings";

export default function BudgetPage() {
  const navigate = useNavigate();

  // Local states
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("US Dollar");

  // Save budget to localStorage
  function handleSave() {
    localStorage.setItem(
      "budget",
      JSON.stringify({
        amount: amount,
        currency: currency,
      })
    );

    navigate("/settings"); // Go back to settings page
  }

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

            {/* FORM FIELDS */}
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Saving Reminder</p>
                <select className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3 bg-white">
                  <option>Once Per Day</option>
                  <option>Once Per Week</option>
                  <option>Once Per Month</option>
                  <option>Once Per Year</option>
                  <option>Never</option>
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Monthly Food Budget</p>
                <input
                  className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 300)"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Currency</p>
                <select
                  className="w-full h-10 rounded-lg border border-[#e2e2e2] px-3 bg-white"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>US Dollar</option>
                  <option>Euro</option>
                  <option>Yen</option>
                </select>
              </div>
            </div>

            {/* DONE BUTTON */}
            <button
              onClick={handleSave}
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