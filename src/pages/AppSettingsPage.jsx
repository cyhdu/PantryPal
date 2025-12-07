import { useState, useEffect } from "react";
import PersonalInfo from "../components/PersonalInfo";
import SettingsPreferences from "../components/SettingsPreferences";
import SecuritySection from "../components/SecuritySection";
import api from "../services/api"; // Import the API service

export default function AppSettings() {
  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("Loading...");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await api.get(`/users/${userId}`);
          setUserName(response.data.username);
          setUserEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserName("Error");
          setUserEmail("Error");
        }
      } else {
        setUserName("Guest");
        setUserEmail("N/A");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="px-10 py-8 max-w-4xl">

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-red-500 border border-black">
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#FF8A00]">
            {userName}
          </h1>
          <p className="text-sm text-[#5A5A5A]">{userEmail}</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <PersonalInfo />

      {/* Preferences */}
      <SettingsPreferences />

      {/* Security */}
      <SecuritySection />

      {/* App Section */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-[#39712e] mb-2">App</h2>

        <div className="max-w-xl divide-y divide-[#e8e8e8]">

          {/* Language Row */}
          <div className="py-3 flex justify-between items-center text-sm text-[#333] cursor-pointer hover:bg-[#faf7ef] transition rounded-md px-2">
            <span>App Language</span>
            <span className="text-lg text-gray-400">&gt;</span>
          </div>

          {/* Accent Color Row */}
          <div className="py-3 flex justify-between items-center text-sm text-[#333] cursor-pointer hover:bg-[#faf7ef] transition rounded-md px-2">
            <span>Accent Color</span>
            <span className="text-lg text-gray-400">&gt;</span>
          </div>

        </div>
      </section>
    </div>
  );
}