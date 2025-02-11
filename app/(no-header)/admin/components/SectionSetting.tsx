// File: pages/admin.js
import { useEffect, useRef, useState } from "react";
import { PrivateHomeSectionServ } from "@services/Private_HomeSectionService";
import { PublicHomeSectionServ } from "@services/Public_HomeSectionService";
import { HomeSection } from "@customTypes/homeSection";

import Spinner from "@public/assets/icons/MySpinner.jsx";
import _, { update } from "lodash";

export default function SectionSetting() {
  const [fetchedSections, setFetchedSections] = useState<HomeSection[]>([]);
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [editing, setEditing] = useState(
    sections.map((item) => ({ id: item.id, editing: false }))
  );
  const sectionsLength = sections.length;

  const [loading, setLoading] = useState(true);

  const [sectionsChanged, setSectionsChanged] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState("");

  // Add a new section
  const addNewSection = () => {
    if (newSectionTitle.trim() === "")
      return alert("Section title cannot be empty!");
    const newSection: HomeSection = { title: newSectionTitle };
    setSections((pre) => [...pre, newSection]);
    setNewSectionTitle("");
  };

  // Edit a section title
  const editSection = async (data: HomeSection) => {
    // Narrow types using type guards
    if (!data.id) return;
    setSections((pre) =>
      pre.map((section) => (section.id == data.id ? data : section))
    );
  };

  // Delete a section
  const deleteSection = async (id: number) => {
    const sureDelete = window.confirm("Are you sure to delete this section");
    if (sureDelete) {
      try {
        setLoading(true);
        const response = await PrivateHomeSectionServ.deleteSection(id);
        if (response.status === 204) {
          const updatedSections = sections.filter((item) => item.id !== id);
          setSections(updatedSections);
          setFetchedSections(updatedSections);
        } else {
          window.alert("Fail to delete");
        }
      } catch (error) {
        window.alert((error as Error).message || " Fail to delete");
      } finally {
        setLoading(false);
      }
    }
  };

  // Move a section up or down
  const moveSection = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(index, 1);
    reorderedSections.splice(newIndex, 0, movedSection);
    // Set new position by new index for local sections
    const updatedPositionSections = reorderedSections.map(
      (item: HomeSection, index) => ({
        ...item,
        position: index + 1,
      })
    );
    setSections(updatedPositionSections);
  };

  // Handle change edit status for row
  const switchEditStatus = (id: number) => {
    const updatedEditingStatus = editing.map((item) =>
      item.id === id ? { ...item, editing: !item.editing } : item
    );
    setEditing(updatedEditingStatus);
  };

  // Check if section position changed
  const areSectionsChanged = () => {
    return !_.isEqual(sections, fetchedSections);
  };

  // Update positions
  const saveSections = async () => {
    // Reset input state
    setEditing((pre) => pre.map((item) => ({ ...item, editing: false })));
    // Update multiple sections
    try {
      setLoading(true);
      const { data }: { data: HomeSection[] } =
        await PrivateHomeSectionServ.updateMultiple(sections);
      setFetchedSections(data);
      setSections(data);
    } catch (error) {
      window.alert((error as Error).message || "Error when save");
    } finally {
      setLoading(false);
    }
  };

  // Side effect
  // Get home sections
  useEffect(() => {
    const getHomeSections = async () => {
      setLoading(true);
      try {
        const { data } = await PublicHomeSectionServ.getHomeSections();
        setSections(data);
        setFetchedSections(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getHomeSections();
  }, []);
  // Check changes to display save button
  useEffect(() => {
    const changed = areSectionsChanged();
    if (changed) {
      setSectionsChanged(true);
    } else {
      setSectionsChanged(false);
    }
  }, [sections, fetchedSections]);
  // Debug
  useEffect(() => {
    setEditing((pre) => {
      const newEditStatus = sections.map((item) => {
        const currentStatus = pre.find(
          (currentItem) => currentItem.id === item.id
        );
        const currentEditing = currentStatus?.editing;
        return { id: item.id, editing: currentEditing || false };
      });
      return newEditStatus;
    });
  }, [sections, fetchedSections]);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Add Section Input */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter section title"
            className="border rounded px-4 py-2 w-full"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
          />
          <button
            onClick={addNewSection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Sections Table */}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-20 border p-2 text-left">Order</th>
              <th className="border p-2 text-left">Title</th>
              <th className="w-60 border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section: HomeSection, index) => {
              const editingStatus = editing.find(
                (item) => item.id === section.id
              );
              return (
                <TableRow
                  key={`section-${index}`}
                  data={{
                    section,
                    index,
                    sectionsLength,
                    editing: editingStatus?.editing,
                  }}
                  actions={{
                    editSection,
                    deleteSection,
                    moveSection,
                    switchEditStatus,
                  }}
                />
              );
            })}
          </tbody>
        </table>
        <div className={`flex justify-between align-middle mt-2 `}>
          <div></div>
          {loading ? (
            <Spinner className="animate-spin h-8 w-8 text-blue-600" />
          ) : (
            <div></div>
          )}
          <button
            disabled={!sectionsChanged || loading}
            className={` text-white py-2 px-4 rounded-md ${
              sectionsChanged && !loading ? `bg-button-primary` : "bg-slate-300"
            }`}
            onClick={saveSections}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Add this function to fetch section settings
export const fetchSectionSettings = async (): Promise<HomeSection[]> => {
  try {
    const { data } = await PublicHomeSectionServ.getHomeSections();
    return data;
  } catch (error) {
    console.error("Failed to fetch section settings", error);
    return [];
  }
};

interface TableRowProps {
  data: any;
  actions: any;
}

const TableRow: React.FC<TableRowProps> = ({ data, actions }) => {
  const { section, index, sectionsLength, editing } = data;
  const { editSection, deleteSection, moveSection, switchEditStatus } = actions;
  const [input, setInput] = useState(section.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    editSection({ ...section, title: input });
    switchEditStatus(section.id);
  };
  useEffect(() => {
    if (editSection && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  // Sync input state when section.title change
  useEffect(() => {
    if (!editing) {
      setInput(section.title);
    }
  }, [section.title]);
  return (
    <tr className="border-t">
      <td className=" p-2 flex justify-between">
        {index !== 0 ? (
          <button
            onClick={() => moveSection(index, -1)}
            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
          >
            ↑
          </button>
        ) : (
          <button className="invisible  px-2 py-1">↑</button>
        )}
        {index + 1 !== sectionsLength ? (
          <button
            onClick={() => moveSection(index, 1)}
            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
          >
            ↓
          </button>
        ) : (
          <button className="invisible px-2 py-1">↓</button>
        )}
      </td>
      {editing ? (
        <td className="border p-2 h-10">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="outline-none bg-gray-100 w-full h-full"
          />
        </td>
      ) : (
        <td className="border p-2 h-10">{section.title}</td>
      )}

      <td className="border p-2 text-center space-x-2">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-blue-400 text-white px-1 py-1 rounded hover:bg-blue-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              switchEditStatus(section.id);
            }}
            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
        )}
        {editing ? (
          <button
            onClick={() => {
              switchEditStatus(section.id);
              setInput(section.title);
            }}
            className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => {
              deleteSection(section.id);
            }}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};
