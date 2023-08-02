"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

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

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [filterPosts, setFilterPosts] = useState([]);
  const [filterTimeout, setFilterTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  //Define object that storage the reference to filterTimeout

  // In filter function let assign filter function to filter timeout
  const filterData = () => {
    // filter posts data theo searchString nếu khớp thì sẽ trả về các post đó
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) => {
      return (
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
      );
    });
  };

  const handleSearchChange = async (e) => {
    // Clear previous timeout object
    clearTimeout(filterTimeout);
    // Get search string from input
    setSearchText(e.target.value);
    setFilterTimeout(
      setTimeout(() => {
        const searchResult = filterData();
        setFilterPosts(searchResult);
      }, 1000)
    );
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("./api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
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
        filterPosts.length === 0 ? (
          <div className="w-full text-center text-gray-500 mt-10">
            {" "}
            Not found
          </div>
        ) : (
          <PromptCardList data={filterPosts} handleOnClick={() => {}} />
        )
      ) : (
        <PromptCardList data={posts} handleOnClick={() => {}} />
      )}
    </section>
  );
}
