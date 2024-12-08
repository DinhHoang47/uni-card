"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@lib/useUser";
import AdminDashboard from "./components/AdminDashboard";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const PASSWORD = "1234"; // Replace this with your password
  const { user } = useUser("/auth");

  useEffect(() => {
    const checkPassword = () => {
      const inputPassword = window.prompt("ようこそ！");
      if (inputPassword === PASSWORD) {
        setAuthenticated(true);
      } else {
        alert("Incorrect password. Redirecting to home page.");
        router.push("/"); // Redirect to homepage or another route
      }
    };

    checkPassword();
  }, [router]);

  if (!authenticated) {
    return null; // Render nothing until authenticated
  }

  return (
    <div style={{ padding: "20px" }}>
      <a href="/mypage">← My page</a>
      <AdminDashboard />
      {/* Add your admin components below */}
    </div>
  );
};

export default Admin;
