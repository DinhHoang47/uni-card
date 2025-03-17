"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@lib/useUser";
import AdminDashboard from "./components/AdminDashboard";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const PASSWORD = "1234"; // Replace this with your password
  const { user } = useUser("/auth");
  const isAdmin = user?.type === process.env.NEXT_PUBLIC_ADMIN_CODE * 1;

  useEffect(() => {
    const checkPassword = () => {
      let inputPassword = "";
      if (isAdmin) {
        inputPassword = window.prompt("ようこそ！");
      }
      if (inputPassword === PASSWORD && isAdmin) {
        setAuthenticated(true);
      } else {
        alert("Not found");
      }
    };

    checkPassword();
  }, [router, user]);

  if (!authenticated) {
    return null; // Render nothing until authenticated
  }

  return (
    <div style={{ padding: "20px" }}>
      <a href="/mypage">← My page</a>
      {authenticated && <AdminDashboard />}
    </div>
  );
};

export default Admin;
