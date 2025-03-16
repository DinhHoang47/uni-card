import { useState, useEffect } from "react";
import axios from "axios";
import { fetchSectionSettings } from "./SectionSetting"; // Import the fetchSectionSettings function
import {
  HomeSection,
  HomeSectionCollectionResponse,
} from "@customTypes/homeSection";
import { publicCollectionServ } from "@services/Public_CollectionService"; // Import the publicCollectionServ
import { PublicHomeSectionServ } from "@services/Public_HomeSectionService";
import MySpinner from "@public/assets/icons/MySpinner";
import { PrivateHomeSectionCollectionsServ } from "@services/Private_HomeSectionCollectionsService";
import Pagination from "./PaginationButtons";
import SectionContentTable from "./SectionContentTable"; // Import the new component

type Collection = {
  id: number;
  title: string;
};

const searchCollections = async (searchQuery = "", currentPage: number) => {
  try {
    const { data } = await publicCollectionServ.searchCollection(
      searchQuery,
      currentPage
    );
    return {
      status: 200,
      collections: data.collections,
      totalPages: data.totalPages,
      currentPage,
    };
  } catch (error) {
    return { status: 500, collections: [], totalPages: 1 };
  }
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
  const [sectionData, setSectionData] = useState<
    HomeSectionCollectionResponse[]
  >([]);
  const [fetchedSectionData, setFetchedSectionData] = useState<
    HomeSectionCollectionResponse[]
  >([]);
  const [sectionOrderChanged, setSectionOrderChanged] =
    useState<boolean>(false);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(false);

  // Pagination state for collections search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const handleSearch = async () => {
    if (!searchQuery) {
      setCollections([]);
      setCurrentPage(1);
      setTotalPages(1);
      return;
    }
    try {
      const res = await searchCollections(searchQuery, currentPage);

      if (res.status === 200) {
        setCollections(res.collections);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage ?? 1);
      }
    } catch (error) {
      setCollections([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
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

  const handleSaveChanges = async () => {
    if (sectionOrderChanged) {
      const sectionPositionData = sectionData.map((section) => ({
        id: section.id!,
        position: section.position,
      }));
      const res =
        await PrivateHomeSectionCollectionsServ.updateMultipleSectionData(
          sectionPositionData
        );
      if (res.status === 200) {
        setSectionOrderChanged(false);
        fetchCollections(selectedSection!.id!);
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
        setFetchedSectionData(response.data);
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

  const moveCollection = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sectionData.length) return;

    const toReorderSectionData = Array.from(sectionData);
    const [toMoveCollection] = toReorderSectionData.splice(index, 1);
    toReorderSectionData.splice(newIndex, 0, toMoveCollection);
    const _reorderedSectionData = toReorderSectionData.map(
      (item: HomeSectionCollectionResponse, index) => ({
        ...item,
        position: index + 1,
      })
    );
    setSectionData(_reorderedSectionData);
  };

  useEffect(() => {
    const positionChanged = sectionData.some((section, index) => {
      return section.id !== fetchedSectionData[index].id;
    });
    if (sectionData.length > 0) {
      setSectionOrderChanged(positionChanged);
    }
  }, [sectionData]);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);
  // Reset currentPage when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
      <SectionContentTable
        sectionData={sectionData}
        loadingCollections={loadingCollections}
        moveCollection={moveCollection}
        handleRemoveCollectionFromSection={handleRemoveCollectionFromSection}
        sectionOrderChanged={sectionOrderChanged}
        handleSaveChanges={handleSaveChanges}
      />

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
        <div className="">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionContentSetting;
