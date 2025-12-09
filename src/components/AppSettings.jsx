import { useState, useEffect } from "react";
import SecuritySection from "../components/SecuritySection";
import api from "../services/api";
import ToastMessage from "./ToastMessage";

export default function AppSettings() {
  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("Loading...");
  const [newUserName, setNewUserName] = useState("");
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.username);
        setNewUserName(response.data.username);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserName("Error");
        setUserEmail("Error");
      }
    };

    fetchUserProfile();
  }, []);

  const avatarLabel =
    userName && userName !== "Loading..." && userName !== "Error"
      ? userName.charAt(0).toUpperCase()
      : "?";

  const updateUsername = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await api.patch(`/users/${userId}`, { username: newUserName });
      setUserName(newUserName);
      showToast("Username updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update username.", "error");
    }
  };

  return (
    <div className="px-10 py-8 max-w-4xl">
      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-green-200 border border-gray-300 flex items-center justify-center text-2xl font-semibold text-gray-700">
          {avatarLabel}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#FF8A00]">{userName}</h1>
          <p className="text-sm text-[#5A5A5A]">{userEmail}</p>
        </div>
      </div>

      {/* ================================ */}
      {/*   USERNAME + EMAIL EDIT SECTION   */}
      {/* ================================ */}

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-[#39712e] mb-2">Profile</h2>

        <div className="max-w-xl divide-y divide-[#e8e8e8]">

          {/* Username Row */}
          <div className="py-3">
            <label className="text-sm text-gray-600">Username</label>
            <input
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mt-1"
            />

            <button
              onClick={updateUsername}
              className="mt-3 bg-[#FF8A00] text-white px-4 py-2 rounded-lg text-sm"
            >
              Save Username
            </button>
          </div>

          {/* Email Row */}
          <div className="py-3">
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={userEmail}
              readOnly
              className="w-full border px-3 py-2 rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* ======================= */}
      {/*   PASSWORD CHANGE AREA  */}
      {/* ======================= */}

      <SecuritySection />
    </div>
  );
}