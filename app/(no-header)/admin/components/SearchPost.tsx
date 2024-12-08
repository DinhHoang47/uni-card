import { useState } from "react";

type Post = {
  id: string;
  title: string;
};

interface PostSearchProps {
  onAddPost: (post: Post) => void; // Callback to add a post to the managed posts list
}

const PostSearch: React.FC<PostSearchProps> = ({ onAddPost }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search input
  const [searchResults, setSearchResults] = useState<Post[]>([]); // Search results
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Simulate fetching posts from a server
  const fetchPosts = async (query: string) => {
    setIsLoading(true);

    // Simulate API delay and result
    setTimeout(() => {
      const allPosts: Post[] = [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Next.js Guide" },
        { id: "3", title: "TypeScript Tips" },
        { id: "4", title: "Advanced JavaScript" },
        { id: "5", title: "Understanding Redux" },
      ];

      const filteredPosts = allPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredPosts);
      setIsLoading(false);
    }, 1000); // Simulate 1s API delay
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      fetchPosts(value);
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Search Posts</h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter post title..."
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />

      {/* Search Results */}
      <div>
        {isLoading ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <span>{post.title}</span>
                <button
                  onClick={() => onAddPost(post)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostSearch;
