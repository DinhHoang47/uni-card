"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

export default function UserProfile({ params }) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`../api/user/${params.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
    getUserPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}
