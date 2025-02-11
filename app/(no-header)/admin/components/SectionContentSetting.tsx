import { useState, useEffect } from "react";
import axios from "axios";
import { fetchSectionSettings } from "./SectionSetting"; // Import the fetchSectionSettings function
import { HomeSection } from "@customTypes/homeSection";
import { publicCollectionServ } from "@services/Public_CollectionService"; // Import the publicCollectionServ
import { PublicHomeSectionServ } from "@services/Public_HomeSectionService";
import MySpinner from "@public/assets/icons/MySpinner";
import { PrivateHomeSectionCollectionsServ } from "@services/Private_HomeSectionCollectionsService";

type Collection = {
  id: number;
  title: string;
};

type HomeSectionCollection = {
  id: number;
  collection: Collection;
  position: number;
};

// Replace the mock fetchCollections function with the actual search function
const searchCollections = async (searchQuery = ""): Promise<Collection[]> => {
  const { data } = await publicCollectionServ.searchCollection(searchQuery, 1);
  return data.collections;
};

const addCollectionToSection = async (
  collectionId: number,
  sectionId: number
) => {
  const res = await PrivateHomeSectionCollectionsServ.create({
    collectionId,
    sectionId,
  });
  return res;
};

const removeCollectionFromSection = async (
  collectionId: number,
  sectionId: number
): Promise<void> => {
  console.log(`Removed collection ${collectionId} from section ${sectionId}`);
};

const SectionContentSetting: React.FC = () => {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedSection, setSelectedSection] = useState<HomeSection | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sectionData, setSectionData] = useState<HomeSectionCollection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(false);

  useEffect(() => {
    const fetchSections = async () => {
      const sections = await fetchSectionSettings();
      setSections(sections);
    };
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      fetchCollections(selectedSection.id!);
    }
  }, [selectedSection]);

  const handleSearch = () => {
    searchCollections(searchQuery).then(setCollections);
  };

  const handleAddCollectionToSection = async (collectionId: number) => {
    if (selectedSection) {
      const res = await addCollectionToSection(
        collectionId,
        selectedSection.id!
      );
      if (res.status === 201) {
        fetchCollections(selectedSection.id!);
      }
    }
  };

  const fetchCollections = async (sectionId: number) => {
    try {
      setLoadingCollections(true);
      const response = await PublicHomeSectionServ.getCollectionsBySectionId(
        sectionId
      );
      if (response.status === 200) {
        setSectionData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch collections", error);
    } finally {
      setLoadingCollections(false);
    }
  };

  const handleRemoveCollectionFromSection = async (
    sectionCollectionId: number
  ) => {
    if (selectedSection) {
      const res =
        await PrivateHomeSectionCollectionsServ.deleteSectionCollection(
          sectionCollectionId
        );
      if (res.status === 204) {
        fetchCollections(selectedSection.id!);
      }
    }
  };

  // Move a section up or down
  const moveCollection = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const reorderedCollections = Array.from(collections);
    const [movedCollection] = reorderedCollections.splice(index, 1);
    reorderedCollections.splice(newIndex, 0, movedCollection);
    // Set new position by new index for local sections
    const updatedPositionCollections = reorderedCollections.map(
      (item: Collection, index) => ({
        ...item,
        position: index + 1,
      })
    );
    setCollections(updatedPositionCollections);
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

          {sections.map((section) => {
            return (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* Table displaying collections that belong to the selected section */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Collections in Section
        </h3>
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Order</th>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingCollections && (
              <tr>
                <td className="px-4 py-2">
                  <MySpinner className="animate-spin h-8 w-8 text-blue-600" />
                </td>
              </tr>
            )}
            {sectionData.length === 0 && !loadingCollections && (
              <tr>
                <td className="px-4 py-2">No collections.</td>
              </tr>
            )}
            {sectionData.map((section, index) => {
              return (
                <tr key={section.id} className="border-t">
                  <td className=" p-2 flex justify-between">
                    {index !== 0 ? (
                      <button
                        onClick={() => moveCollection(index, -1)}
                        className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                      >
                        ↑
                      </button>
                    ) : (
                      <button className="invisible  px-2 py-1">↑</button>
                    )}
                    {index + 1 !== sectionData.length ? (
                      <button
                        onClick={() => moveCollection(index, 1)}
                        className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                      >
                        ↓
                      </button>
                    ) : (
                      <button className="invisible px-2 py-1">↓</button>
                    )}
                  </td>
                  <td className="px-4 py-2">{section.collection.title}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() =>
                        handleRemoveCollectionFromSection(section.id)
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Search bar for searching collections */}
      <div className="space-y-2">
        <label
          htmlFor="search"
          className="block text-lg font-semibold text-gray-700"
        >
          Search Collections:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="search"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table displaying collections based on search query */}
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
            {collections.map((collection) => {
              const isAdded = sectionData.some(
                (section) => section.collection.id === collection.id
              );
              return (
                <tr key={collection.id} className="border-t">
                  <td className="px-4 py-2">{collection.title}</td>
                  <td className="px-4 py-2">
                    <button
                      disabled={isAdded}
                      className={`${
                        isAdded
                          ? "bg-slate-200"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      } px-4 py-2 text-white  rounded-md `}
                      onClick={() =>
                        handleAddCollectionToSection(collection.id)
                      }
                    >
                      Add to Section
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionContentSetting;
