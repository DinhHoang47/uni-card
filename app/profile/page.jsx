"use client";
import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptCardList = ({ data, handleTagClick, handleDelete, handleEdit }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default function Profile() {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState();
  const [filteredPosts, setFilterdPosts] = useState([]);
  const router = useRouter();

  const filterPost = () => {
    const regex = RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.tag) || regex.test(post.prompt) || regex.test(post.tag)
    );
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPost();
        setFilterdPosts(searchResult);
      }, 1000)
    );
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("Are you sure to delete this post");
    if (confirmed) {
      await fetch(`./api/prompt/${postId}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: session?.user.id,
        }),
      });
      fetchPost();
    }
  };
  const handleEdit = (postId) => {
    router.push(`/update-prompt?id=${postId}`);
  };

  const fetchPost = async () => {
    const response = await fetch(`./api/user/${session?.user?.id}/posts`);

    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
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
      {searchText ? (
        filteredPosts.length !== 0 ? (
          <PromptCardList
            test={{ key: "1" }}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            data={filteredPosts}
            handleOnClick={() => {}}
          />
        ) : (
          <div>Not found</div>
        )
      ) : (
        <PromptCardList
          test={{ key: "1" }}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          data={posts}
          handleOnClick={() => {}}
        />
      )}
    </section>
  );
}
