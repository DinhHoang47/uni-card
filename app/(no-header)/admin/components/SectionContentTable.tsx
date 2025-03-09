import React from "react";
import MySpinner from "@public/assets/icons/MySpinner";
import { HomeSectionCollectionResponse } from "@customTypes/homeSection";

interface SectionContentTableProps {
  sectionData: HomeSectionCollectionResponse[];
  loadingCollections: boolean;
  moveCollection: (index: number, direction: number) => void;
  handleRemoveCollectionFromSection: (sectionCollectionId: number) => void;
  sectionOrderChanged: boolean;
  handleSaveChanges: () => void;
}

const SectionContentTable: React.FC<SectionContentTableProps> = ({
  sectionData,
  loadingCollections,
  moveCollection,
  handleRemoveCollectionFromSection,
  sectionOrderChanged,
  handleSaveChanges,
}) => {
  return (
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
          {!loadingCollections &&
            sectionData.map((section, index) => {
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
      <div className="flex justify-end mt-4">
        <button
          disabled={!sectionOrderChanged}
          className={`${
            !sectionOrderChanged
              ? "bg-slate-200"
              : "bg-blue-500 hover:bg-blue-600"
          } px-4 py-2 text-white  rounded-md `}
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SectionContentTable;
