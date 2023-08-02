"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePrompt() {
  const { data: session } = useSession();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParam = useSearchParams();
  const editPostId = searchParam.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`./api/prompt/${editPostId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("./");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleChange = async (e) => {
    setPost({ ...post, [e.target.name]: [e.target.value] });
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`./api/prompt/${editPostId}`);
        const { prompt, tag } = await response.json();
        setPost({ prompt, tag });
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
