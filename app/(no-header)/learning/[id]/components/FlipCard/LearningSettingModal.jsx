import PortalModalWrapper from "@components/PortalModalWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLearningStatus } from "@lib/useLearningStatus";
import { Switch } from "@mui/material";
import Square3Stack3D from "@public/assets/icons/Square3Stack3D";
import { privateUserServ } from "@services/Private_UserService";
import { useEffect, useState } from "react";

export default function LearningSettingModal({
  hanger,
  setIsOpen,
  collectionId,
  mutateLearningStatus,
}) {
  const { data: learningStatus } = useLearningStatus(collectionId);
  const pageSize = learningStatus?.flip_mode_page_size;
  const isDisplay = learningStatus?.is_display_status ? true : false;
  //   Local state
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [currentDisplayStatus, setCurrentDisplayStatus] = useState(isDisplay);
  const [loading, setLoading] = useState(false);
  // Handler
  const handleSave = async () => {
    try {
      setLoading(true);
      const result = await privateUserServ().updateLearningSetting(
        collectionId,
        {
          flipModePageSize: currentPageSize,
          isDisplayStatus: currentDisplayStatus,
        }
      );
      mutateLearningStatus();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      setLoading(false);
    }
  };
  return (
    <PortalModalWrapper mountTarget={hanger}>
      <div className="p-6 rounded relative bg-white space-y-3">
        <div className="font-semibold text-lg text-center select-none">
          Display setting
        </div>
        {/* Option 1 */}
        <div className="space-y-8">
          <div className="flex space-x-4">
            <p className="font-semibold">Card per page:</p>
            <PageSizeInput
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
            />
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-semibold">Display testing status</p>
            <Switch
              checked={currentDisplayStatus}
              onChange={(e) => {
                setCurrentDisplayStatus(e.target.checked);
              }}
            />
          </div>
        </div>
        {/* Actions */}
        <div className="!mt-8">
          <button
            onClick={handleSave}
            className="h-10 bg-blue-500 w-full text-white font-semibold rounded-md"
          >
            Save
          </button>
        </div>
        {/* Close button */}
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="absolute !mt-0 top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-white w-8 h-8 border-2 border-gray-500 flex items-center justify-center rounded-full"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}

const PageSizeInput = ({ currentPageSize, setCurrentPageSize }) => {
  return (
    <div className="flex">
      <label className="flex space-x-2" htmlFor="page-size">
        <Square3Stack3D className={`h-6 w-6`} /> 
      </label>
      <select
        defaultValue={currentPageSize}
        onChange={(e) => {
          setCurrentPageSize(e.target.value * 1);
        }}
        className="px-2 bg-transparent outline-none"
        name="page-size"
        id="page-size"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};
