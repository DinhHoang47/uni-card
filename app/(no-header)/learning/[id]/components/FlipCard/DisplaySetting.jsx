import { useEffect, useState } from "react";

export default function DisplaySetting({ setDisplayOptions, initOptions }) {
  // Local state
  return (
    <>
      <div className={`w-full space-y-4`}>
        {/* Setting & button */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Setting */}

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
          {/* Actions */}
        </div>
      </div>
    </>
  );
}
