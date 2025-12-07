import React, { useState, useEffect } from "react";
// import profilePic from "../assets/logo-white.jpeg";
import api from "../services/api";

type HeaderProfileProps = {
  userName?: string;
};

export default function HeaderProfile({
  userName: propUserName,
}: HeaderProfileProps) {
  const [displayName, setDisplayName] = useState(""); // Initialize to empty string to avoid flicker

  useEffect(() => {
    // If a userName prop is explicitly passed and is not the default "User", prioritize it
    if (propUserName && propUserName !== "User") {
      setDisplayName(propUserName);
      return;
    }

    const userId = localStorage.getItem("userId");
    // If no userId, user is likely not logged in, set to default "User"
    if (!userId) {
      setDisplayName("User");
      return;
    }

    // Otherwise, fetch from API
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        if (res.data?.username) {
          setDisplayName(res.data.username);
        } else {
          setDisplayName("User"); // Fallback if API returns no username
        }
      } catch (error) {
        console.error("Error fetching user for header:", error);
        setDisplayName("User"); // Fallback on API error
      }
    };

    fetchUser();
  }, [propUserName]); // Dependency array includes propUserName so if it changes, effect reruns.

  return (
    <header
      className="flex items-center justify-between px-8 py-4 border-b border-[#eeeeee]"
      style={{ marginLeft: "240px" }}
    >
      {/* Spacer to push content to right */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-6">
        <button className="relative">
          <span className="text-sm text-gray-600 font-medium">{displayName}</span>
        </button>

        {/* Profile Avatar */}
        {/* <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div> */}
      </div>
    </header>
  );
}