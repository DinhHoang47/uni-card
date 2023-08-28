"use client";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextareaAutosize } from "@mui/base";

export default function AddTermModal({ setIsModalOpen, isModalOpen }) {
  // Handle dynamic size for modal start
  const childrenRef = useRef(null);
  const [childHeight, setChildHeight] = useState();
  const [childWidth, setChildWidth] = useState();
  useEffect(() => {
    setChildHeight(childrenRef.current.offsetHeight);
    setChildWidth(childrenRef.current.offsetWidth);
  }, [childHeight, childWidth]);
  // Handle dynamic size for modal end
  const cardDataSchema = {
    term: "",
    define_1: "",
    define_2: "",
    image: "",
    example: "",
  };
  const [cardData, setCardData] = useState(cardDataSchema);

  // Disable scrollbar after render modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <PortalModalWrapper childrenHeight={childHeight} childrenWidth={childWidth}>
      {/* Main Container */}
      <div ref={childrenRef} className="bg-white relative rounded-md p-6">
        <h3 className="font-semibold text-xl text-center">Add Term</h3>
        {/* Desktop Preview*/}
        <div className="hidden sm:block space-y-2 ">
          <h4 className="">Preview</h4>
          <div className="flex px-4 space-x-8">
            {/* Front review */}
            <div className="space-y-1">
              <div
                className={`border-2 ${
                  cardData.term !== "" ? "" : "text-gray-300"
                }  rounded border-slate-400 h-24 w-40 flex items-center justify-center`}
              >
                <p className="w-full text-center break-words whitespace-pre-line max-h-full overflow-y-auto font-semibold">
                  {cardData.term !== "" ? cardData.term : "漢字"}
                </p>
              </div>
              <div className="text-center text-sm">Front</div>
            </div>
            {/* Back preview */}
            <div className="space-y-1">
              <div className="relative border-2 rounded border-slate-400 h-24 w-40 flex flex-col items-center justify-center">
                {/* Back side background */}
                <div
                  style={{
                    backgroundImage: `url(${"/assets/images/no-image-holder.jpg"})`,
                    backgroundSize: `30px 30px`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center 0px`,
                  }}
                  className={`h-10 w-full opacity-70 flex items-center`}
                ></div>
                {/* Absolute container */}
                <div
                  className={`absolute top-0 left-0 h-full w-full flex flex-col rounded justify-between items-center text-[0.75rem]  py-1 `}
                >
                  <p
                    className={`${
                      cardData.define_2 !== "" ? "" : "text-gray-300"
                    }  max-w-full break-words line-clamp-2`}
                  >
                    {cardData.define_2 !== "" ? cardData.define_2 : "KANJI"}
                  </p>
                  <div className="w-full text-center">
                    <p
                      className={`${
                        cardData.define_1 !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-2 text-[0.5rem]`}
                    >
                      {cardData.define_1 !== "" ? cardData.define_1 : "Meaning"}
                    </p>
                    <p
                      className={`${
                        cardData.example !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-2 text-[0.5rem]`}
                    >
                      {cardData.example !== "" ? cardData.example : "Example"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm">Back</div>
            </div>
          </div>
        </div>
        {/* Mobile Preview */}
        <div className="block sm:hidden space-y-2 ">
          <h4 className="">Preview</h4>
          <div className="flex px-4 space-x-4 justify-center">
            {/* Front review */}
            <div className="space-y-1">
              <div
                className={`border-2 ${
                  cardData.term !== "" ? "" : "text-gray-300"
                }  rounded border-slate-400 h-20 w-36 flex items-center justify-center`}
              >
                <p className="w-full text-center break-words whitespace-pre-line max-h-full overflow-y-auto font-semibold">
                  {cardData.term !== "" ? cardData.term : "漢字"}
                </p>
              </div>
              <div className="text-center text-sm">Front</div>
            </div>
            {/* Back preview */}
            <div className="space-y-1">
              <div className="relative border-2 rounded border-slate-400 h-20 w-36 flex flex-col items-center justify-center">
                {/* Back side background */}
                <div
                  style={{
                    backgroundImage: `url(${"/assets/images/no-image-holder.jpg"})`,
                    backgroundSize: `30px 30px`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center 0px`,
                  }}
                  className={`h-10 w-full opacity-70 flex items-center`}
                ></div>
                {/* Absolute container */}
                <div
                  className={`absolute top-0 left-0 h-full w-full flex flex-col rounded justify-between items-center text-[0.75rem]  py-1 `}
                >
                  <p
                    className={`${
                      cardData.define_2 !== "" ? "" : "text-gray-300"
                    }  max-w-full break-words line-clamp-2`}
                  >
                    {cardData.define_2 !== "" ? cardData.define_2 : "KANJI"}
                  </p>
                  <div className="w-full text-center">
                    <p
                      className={`${
                        cardData.define_1 !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-2 text-[0.5rem]`}
                    >
                      {cardData.define_1 !== "" ? cardData.define_1 : "Meaning"}
                    </p>
                    <p
                      className={`${
                        cardData.example !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-2 text-[0.5rem]`}
                    >
                      {cardData.example !== "" ? cardData.example : "Example"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm">Back</div>
            </div>
          </div>
        </div>
        {/* Data Input Section */}
        <form className="space-y-2">
          {/* Max length 50 */}
          <div className="space-y-1 ">
            <label className="">Term</label>
            <TextareaAutosize
              placeholder="漢字"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, term: e.target.value }));
              }}
              maxRows={2}
              maxLength={50}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Max length 50 */}
          <div className="space-y-1 ">
            <label className="">Define 1</label>
            <TextareaAutosize
              placeholder="Meaning"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, define_1: e.target.value }));
              }}
              maxRows={2}
              maxLength={50}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Max length 50 */}
          <div className="space-y-1 ">
            <label className="">Define 2</label>
            <TextareaAutosize
              placeholder="KANJI"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, define_2: e.target.value }));
              }}
              maxRows={2}
              maxLength={50}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Max length 100 */}
          <div className="space-y-1 ">
            <label className="">Example</label>
            <TextareaAutosize
              placeholder="Example"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, example: e.target.value }));
              }}
              maxRows={2}
              maxLength={100}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Image upload */}
          <div className="space-y-1 flex flex-col ">
            <label className="">Image</label>
            <input type="file" name="image" id="" />
          </div>
          {/* Submit button */}
          <button
            className="!mt-8 w-full h-10 bg-blue-600 text-white font-semibold rounded-md"
            type="submit"
          >
            Add
          </button>
        </form>

        {/* Close btn */}
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}
