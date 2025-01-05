import { useState, useEffect } from "react";
import axios from "axios";

type Section = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
};

// Mock API functions
const fetchSections = async (): Promise<Section[]> => {
  return [
    { id: 1, name: "Favorite Posts" },
    { id: 2, name: "Tutorials" },
    { id: 3, name: "Random Thoughts" },
  ];
};

const fetchPosts = async (searchQuery = ""): Promise<Post[]> => {
  const allPosts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },
  ];
  return allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const fetchPostsInSection = async (sectionId: number): Promise<Post[]> => {
  return sectionId === 1
    ? [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ]
    : [];
};

const addPostToSection = async (
  postId: number,
  sectionId: number
): Promise<void> => {
  console.log(`Added post ${postId} to section ${sectionId}`);
};

const removePostFromSection = async (
  postId: number,
  sectionId: number
): Promise<void> => {
  console.log(`Removed post ${postId} from section ${sectionId}`);
};

const SectionContentSetting: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [postsInSection, setPostsInSection] = useState<Post[]>([]);

  useEffect(() => {
    fetchSections().then(setSections);
  }, []);

  useEffect(() => {
    if (selectedSection) {
      fetchPostsInSection(selectedSection.id).then(setPostsInSection);
    }
  }, [selectedSection]);

  useEffect(() => {
    fetchPosts(searchQuery).then(setPosts);
  }, [searchQuery]);

  const handleAddPostToSection = (postId: number) => {
    if (selectedSection) {
      addPostToSection(postId, selectedSection.id).then(() => {
        setPostsInSection((prevPosts) => [
          ...prevPosts,
          posts.find((post) => post.id === postId)!,
        ]);
      });
    }
  };

  const handleRemovePostFromSection = (postId: number) => {
    if (selectedSection) {
      removePostFromSection(postId, selectedSection.id).then(() => {
        setPostsInSection((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      });
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50">
      {/* Dropdown for selecting a section */}
      <div className="space-y-2">
        <label
          htmlFor="section"
          className="block text-lg font-semibold text-gray-700"
        >
          Select Section:
        </label>
        <select
          id="section"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          value={selectedSection?.id || ""}
          onChange={(e) => {
            const sectionId = parseInt(e.target.value, 10);
            const section =
              sections.find((sec) => sec.id === sectionId) || null;
            setSelectedSection(section);
          }}
        >
          <option value="">Select a section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search bar for searching posts */}
      <div className="space-y-2">
        <label
          htmlFor="search"
          className="block text-lg font-semibold text-gray-700"
        >
          Search Posts:
        </label>
        <input
          type="text"
          id="search"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table displaying posts that belong to the selected section */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Posts in Section
        </h3>
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postsInSection.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleRemovePostFromSection(post.id)}
                  >
                    Remove from Section
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table displaying posts based on search query */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Search Results
        </h3>
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                    onClick={() => handleAddPostToSection(post.id)}
                  >
                    Add to Section
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionContentSetting;
