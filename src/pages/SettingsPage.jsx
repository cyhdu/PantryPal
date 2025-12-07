import ScaleWrapper from "../components/ScaleWrapper";
import HeaderProfile from "../components/HeaderProfile";
import AppSettings from "../components/AppSettings";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function SettingsPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserName("User"); // Fallback
      }
    }
  };

  return (
    <ScaleWrapper>
      <HeaderProfile userName={userName} />
      <AppSettings />
    </ScaleWrapper>
  );
}