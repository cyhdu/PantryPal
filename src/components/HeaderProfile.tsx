import React from "react";
import profilePic from "../assets/logo-white.jpeg";

type HeaderProfileProps = {
  userName?: string; // Use lowercase string (TypeScript best practice)
};

export default function HeaderProfile({
  userName = "User",
}: HeaderProfileProps) {
  return (
    <header
      className="flex items-center justify-between px-8 py-4 border-b border-[#eeeeee] bg-white"
      style={{ marginLeft: "240px" }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-11 rounded-lg border border-[#e2e2e2] bg-[#fafafa] px-4 text-sm outline-none focus:ring-2 focus:ring-[#FF8A00]/40"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-6">
        <button className="relative">
          <span className="text-sm text-gray-600 font-medium">{userName}</span>
        </button>

        {/* Profile Avatar */}
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
