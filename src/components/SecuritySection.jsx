import { useState } from "react";
import api from "../services/api";
import ToastMessage from "./ToastMessage";

const rowClasses =
  "flex items-center justify-between py-3 border-b border-[#f0f0f0] text-sm text-[#333333] cursor-pointer";

export default function SecuritySection() {
  const [open, setOpen] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [toast, setToast] = useState(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handlePasswordUpdate = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    if (newPass !== confirmPass) {
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      await api.patch(`/users/${userId}/password`, {
        oldPassword: oldPass,
        newPassword: newPass,
      });

      showToast("Password updated successfully!", "success");

      // Clear values
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setOpen(false);
    } catch (err) {
      showToast("Old password incorrect.", "error");
    }
  };

  return (
    <section className="mb-8">
      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-sm font-semibold text-[#39712e] mb-2">Security</h2>

      <div className="max-w-xl">
        {/* Toggle Row */}
        <div className={rowClasses} onClick={toggleOpen}>
          <span>Change Password</span>
          <span className="text-lg text-gray-400">{open ? "˄" : ">"}</span>
        </div>

        {/* Expandable Form */}
        {open && (
          <div className="px-2 py-4 border-b border-[#f0f0f0] space-y-4">

            <div>
              <label className="text-sm text-gray-600">Old Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <button
              onClick={handlePasswordUpdate}
              className="bg-[#FF8A00] text-white px-4 py-2 rounded-lg text-sm w-full"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </section>
  );
}