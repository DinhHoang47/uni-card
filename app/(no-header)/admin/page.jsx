"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@lib/useUser";
import AdminDashboard from "./components/AdminDashboard";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();
  const PASSWORD = "1234"; // Replace this with your password
  const { user } = useUser("/auth");
  const isAdmin = user?.type === process.env.NEXT_PUBLIC_ADMIN_CODE * 1;

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
  useEffect(() => {
    if (user) {
      if (user.type !== process.env.NEXT_PUBLIC_ADMIN_CODE * 1) {
        router.push("/");
      }
    }
  }, [user, router]);
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
