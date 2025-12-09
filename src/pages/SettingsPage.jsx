import ScaleWrapper from "../components/ScaleWrapper";
import AppSettings from "../components/AppSettings";
import { useState, useEffect } from "react";
import api from "../services/api";
import useAuthGuard from "../components/useAuthGuard";

export default function SettingsPage() {
  const [userName, setUserName] = useState("User");

  // Protect the page
  useAuthGuard();

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserName("User"); // Fallback
      }
    };

    fetchUserName();
  }, []);

  return (
    <ScaleWrapper>
      <AppSettings />
    </ScaleWrapper>
  );
}