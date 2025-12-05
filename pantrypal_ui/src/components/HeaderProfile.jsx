import React from "react";
import profilePic from "../assets/profile.png";

export default function HeaderProfile() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#eeeeee] bg-white">
      
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-11 rounded-lg border border-[#e2e2e2] bg-[#fafafa] px-4 text-sm outline-none focus:ring-2 focus:ring-[#FF8A00]/40"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-6 ml-6">
        <button className="relative">
          <span className="material-icons text-gray-500">notifications_none</span>
        </button>

        {/* Profile Avatar FIXED */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
