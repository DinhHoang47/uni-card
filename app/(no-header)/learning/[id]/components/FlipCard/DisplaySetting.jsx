import { useEffect, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Square3Stack3D from "@public/assets/icons/Square3Stack3D";


export default function DisplaySetting({
  setDisplayOptions,
  initOptions,
  cardPerPage,
  setCardPerPage,
  setIsOpenLearningConfig,
}) {
  // Local state
  return (
    <>
      <div className={`w-full space-y-4`}>
        {/* Setting & button */}
        <div className="grid grid-cols-1 gap-0 gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Display setting */}
          <div className="flex items-center space-x-3 font-semibold ">
            <p className="break-keep">Show:</p>
            {initOptions?.displayDef2 && (
              <div className="flex items-center space-x-2">
                <label htmlFor="pronunciation-setting">Pron</label>
                <input
                  defaultChecked={initOptions.displayDef2}
                  onChange={(e) => {
                    setDisplayOptions((pre) => ({
                      ...pre,
                      displayDef2: e.target.checked,
                    }));
                  }}
                  className="h-4 w-4"
                  type="checkbox"
                  name=""
                  id="pronunciation-setting"
                />
              </div>
            )}
            {initOptions?.displayExample && (
              <div className="flex items-center space-x-2">
                <label htmlFor="example-setting">Example</label>
                <input
                  defaultChecked={initOptions.displayExample}
                  onChange={(e) => {
                    setDisplayOptions((pre) => ({
                      ...pre,
                      displayExample: e.target.checked,
                    }));
                  }}
                  className="h-4 w-4"
                  type="checkbox"
                  name=""
                  id="example-setting"
                />
              </div>
            )}
            {initOptions?.displayImg && (
              <div className="flex items-center space-x-2">
                <label htmlFor="image-setting">Image</label>
                <input
                  defaultChecked={initOptions.displayImg}
                  onChange={(e) => {
                    setDisplayOptions((pre) => ({
                      ...pre,
                      displayImg: e.target.checked,
                    }));
                  }}
                  className="h-4 w-4"
                  type="checkbox"
                  name=""
                  id="image-setting"
                />
              </div>
            )}
          </div>
          {/* Page size setting */}
          <div className="flex justify-start sm:justify-end relative">
            {/* Setting button */}
            <div className="flex space-x-2">
              <p className="font-semibold">Setting more:</p>
              <button
                onClick={() => {
                  setIsOpenLearningConfig(true);
                }}
                className="px-2"
              >
                <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const PageSizeInput = () => {
  return (
    <div className="flex absolute sm:-translate-y-[36px] -translate-y-[72px] sm:relative">
      <label className="flex space-x-2" htmlFor="page-size">
         <Square3Stack3D className={`h-6 w-6`} /> 
      </label>
      <select
        value={cardPerPage}
        onChange={(e) => {
          setCardPerPage(e.target.value);
        }}
        className="px-2 bg-transparent outline-none"
        name="page-size"
        id="page-size"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};
