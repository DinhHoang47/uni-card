"use client";
import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default function Profile() {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`./api/user/${session?.user?.id}/posts`);

      const data = await response.json();
      setPosts(data);
    };
    if (session) {
      fetchPost();
    }
  }, [session]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          required
          className="search_input peer"
          onChange={handleSearchChange}
        />
      </form>
      <PromptCardList data={posts} handleOnClick={() => {}} />
    </section>
  );
}
