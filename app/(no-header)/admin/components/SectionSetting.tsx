// File: pages/admin.js
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SectionSetting() {
  const [posts, setPosts] = useState([
    { id: "1", title: "Post 1" },
    { id: "2", title: "Post 2" },
    { id: "3", title: "Post 3" },
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");

  // Handle reordering via drag-and-drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPosts = Array.from(posts);
    const [movedPost] = reorderedPosts.splice(result.source.index, 1);
    reorderedPosts.splice(result.destination.index, 0, movedPost);

    setPosts(reorderedPosts);
  };

  // Add a new post
  const addPost = () => {
    if (newPostTitle.trim() === "") return alert("Post title cannot be empty!");
    const newPost = { id: Date.now().toString(), title: newPostTitle };
    setPosts([...posts, newPost]);
    setNewPostTitle("");
  };

  // Edit a post title
  const editPost = (id) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      setPosts(posts.map((post) => (post.id === id ? { ...post, title: newTitle } : post)));
    }
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Move a post up or down
  const movePost = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= posts.length) return;

    const reorderedPosts = Array.from(posts);
    const [movedPost] = reorderedPosts.splice(index, 1);
    reorderedPosts.splice(newIndex, 0, movedPost);

    setPosts(reorderedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Home <i className="fab fa-search-location fa-xs 
        "></i></h1>

        {/* Add Post Input */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter section title"
            className="border rounded px-4 py-2 w-full"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <button
            onClick={addPost}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Section
          </button>
        </div>

        {/* Posts Table */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="posts">
            {(provided) => (
              <table
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full border-collapse border border-gray-200"
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Post ID</th>
                    <th className="border p-2 text-left">Title</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <Draggable key={post.id} draggableId={post.id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-t"
                        >
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
                            <button
                              onClick={() => movePost(index, -1)}
                              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => movePost(index, 1)}
                              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                            >
                              ↓
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
