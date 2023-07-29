"use client";
import Form from "@components/Form";
import { useState } from "react";

export default function CreatePrompt() {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = () => {};
  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
}
