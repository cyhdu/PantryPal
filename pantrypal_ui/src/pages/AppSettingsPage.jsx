import PersonalInfo from "./PersonalInfo";
import SettingsPreferences from "./SettingsPreferences";
import SecuritySection from "./SecuritySection";
import ProfilePic from "../assets/profile.png"; // local profile image

export default function AppSettings() {
  return (
    <div className="px-10 py-8 max-w-4xl">

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-red-500 border border-black">

          
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#FF8A00]">
            Akash Muthukumar
          </h1>
          <p className="text-sm text-[#5A5A5A]">akashn4@illinois.edu</p>
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
