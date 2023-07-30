"use client";
import Form from "@components/Form";
import { useState } from "react";

export default function CreatePrompt() {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: [e.target.value] });
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
