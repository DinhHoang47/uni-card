import Image from "next/image";

export default function CardPreview({
  displayDef2 = false,
  displayImg = false,
  displayExample = true,
}) {
  return (
    <div className="flex justify-between w-[320px] space-x-2">
      <CardFront />
      <CardBack
        displayDef2={displayDef2}
        displayExample={displayExample}
        displayImg={displayImg}
      />
    </div>
  );
}

const CardFront = () => {
  return (
    <div className="w-1/2">
      <p className="text-center text-gray-400">Front</p>
      <div className="w-full h-24 p-1 flex items-center justify-center border border-black rounded">
        <p className="text-center  font-semibold text-gray-600">Term</p>
      </div>
    </div>
  );
};

const CardBack = ({ displayDef2, displayExample, displayImg }) => {
  return (
    <div className=" w-1/2 relative">
      <p className="text-center text-gray-400">Back</p>
      <div
        className={`w-full h-24   flex items-center justify-center border border-black rounded text-gray-600`}
      >
        <div
          className={`w-full h-full flex flex-col ${
            !displayDef2 && !displayImg ? "justify-center" : "justify-between"
          } text-center ${!displayImg ? "py-2 px-1" : "p-1"}`}
        >
          {/* Def2 */}
          {!displayDef2 && displayImg && <div></div>}
          {displayDef2 && (
            <div className="">
              <p className="text-[10px]">Pronunciation</p>
            </div>
          )}

          {/* Image */}
          {/* Def1 & Example */}
          <div className="bg-white">
            <p className=" font-semibold text-xs">Definition</p>
            {displayExample && <p className="text-[0.5rem]">Example</p>}
            {!displayExample && displayImg && <div className="mb-2"></div>}
          </div>
        </div>
      </div>
      {displayImg && (
        <div className="absolute z-0 top-[64px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            alt="Card Image"
            width={30}
            height={30}
            src={"/assets/images/image-gallery.png"}
          />
        </div>
      )}
    </div>
  );
};
