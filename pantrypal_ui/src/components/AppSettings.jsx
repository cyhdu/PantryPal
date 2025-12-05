import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import SettingsPreferences from "./SettingsPreferences";
import SecuritySection from "./SecuritySection";
import DefaultProfile from "../assets/profile.png";

export default function AppSettings() {
  const [profilePic, setProfilePic] = useState(DefaultProfile);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  return (
    <div className="px-10 py-8 max-w-4xl">

      {/* ==================== PROFILE HEADER ==================== */}
      <div className="flex items-center gap-6 mb-10">

        {/* ==================== FIXED AVATAR BLOCK ==================== */}
        <div className="relative group w-20 h-20">

          {/* Clipped Circle Image */}
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Hover Overlay */}
          <div
            className="
              absolute inset-0 rounded-full 
              bg-black/30 opacity-0 
              group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none
            "
          ></div>

          {/* Edit Button */}
          <label
            htmlFor="profileUpload"
            className="
              absolute bottom-0 right-0 
              translate-x-1 translate-y-1
              w-7 h-7 rounded-full bg-[#FF8A00] 
              flex items-center justify-center cursor-pointer shadow-lg
              transition-transform duration-300 group-hover:scale-110
            "
          >
            <span className="material-icons text-white text-sm">edit</span>
          </label>

          {/* Tooltip */}
          <div
            className="
              absolute top-[-30px] left-1/2 -translate-x-1/2
              bg-black text-white text-xs py-1 px-2 rounded 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none
            "
          >
            Change Photo
          </div>

          {/* Hidden File Input */}
          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* USER NAME + EMAIL */}
        <div>
          <h1 className="text-2xl font-semibold text-[#FF8A00]">
            Akash Muthukumar
          </h1>
          <p className="text-sm text-[#5A5A5A]">akashn4@illinois.edu</p>
        </div>
      </div>

      {/* ==================== SECTIONS ==================== */}
      <PersonalInfo />
      <SettingsPreferences />
      <SecuritySection />

      {/* ==================== APP SETTINGS SECTION ==================== */}
    

    </div>
  );
}
