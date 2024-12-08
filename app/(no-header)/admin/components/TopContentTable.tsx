import { useState, useEffect } from "react";
import axios from "axios";

type Post = {
  id: string;
  title: string;
};

const TopContentTable = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: "1", title: "Post 1" },
    { id: "2", title: "Post 2" },
    { id: "3", title: "Post 3" },
  ]);

  const [originalPosts, setOriginalPosts] = useState<Post[]>([...posts]);
  const [hasChanges, setHasChanges] = useState(false);

  // Detect changes in posts
  useEffect(() => {
    const isChanged = JSON.stringify(posts) !== JSON.stringify(originalPosts);
    setHasChanges(isChanged);
  }, [posts, originalPosts]);

  // Add a new post
  const addPost = (title: string) => {
    const newPost = { id: Date.now().toString(), title };
    setPosts([...posts, newPost]);
  };

  // Edit a post
  const editPost = (id: string) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      setPosts(posts.map((post) => (post.id === id ? { ...post, title: newTitle } : post)));
    }
  };

  // Delete a post
  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Save changes to the server
  const saveChanges = async () => {
    try {
      const response = await axios.post("/api/save-posts", { posts });
      if (response.status === 200) {
        alert("Changes saved successfully!");
        setOriginalPosts([...posts]); // Update the original posts after saving
        setHasChanges(false);
      }
    } catch (error) {
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

        {/* Add Post Input */}

        {/* Posts Table */}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Post ID</th>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="border p-2">{post.id}</td>
                <td className="border p-2">{post.title}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => editPost(post.id)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            onClick={saveChanges}
            className={`px-4 py-2 rounded ${
              hasChanges
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopContentTable;
