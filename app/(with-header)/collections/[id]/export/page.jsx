"use client";
import { useCard } from "@lib/useCard";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import Logo from "@public/assets/images/unicard-logo.png";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { Slider } from "@mui/material";
import Link from "next/link";
import { ColorPicker } from "antd";
import { useCollection } from "@lib/useCollection";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const tailwindColors = [
  "#fef3c7",
  "#fde68a",
  "#d9f99d",
  "#bef264",
  "#d1fae5",
  "#6ee7b7",
  "#f0f9ff",
  "#e0f2fe",
  "#bae6fd",
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#eef2ff",
  "#e0e7ff",
  "#c7d2fe",
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#f3e8ff",
  "#e9d5ff",
  "#d8b4fe",
  "#fae8ff",
  "#d8b4fe",
  "#fce7f3",
  "#fbcfe8",
  "#f9a8d4",
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
];

const DEFAULT_EXPORT_SIZE = 600; //px
const DEFAULT_IMG_SIZE = 56; //px
const DEFAULT_FONT_SIZE = 1.125; // tailwind unit
const DEFAULT_BG_COLOR = "#f0fdf4"; // px
const DEFAULT_BORDER_RADIUS = 0.5; // tailwind unit

const DEFAULT_CANVAS_BG = "#dbeafe"; // blue-100
const DEFAULT_CANVAS_PADDING = 20; // px

export default function page({ params }) {
  // Fetched data
  const { data: cardList } = useCard(params.id);
  const { data: collectionData } = useCollection(params.id);
  const collectionId = params.id;
  const totalTerms = cardList?.length || 0;
  // Local state
  const [pageSize, setPageSize] = useState(5);
  const totalPage = Math.ceil(totalTerms / pageSize);
  const [page, setPage] = useState(1);
  const currentPageData = cardList?.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );
  return (
    <div className="mt-5 mb-10 w-full px-8">
      <BackToThisCollection collectionId={collectionId} />
      <DataSelection
        setPageSize={setPageSize}
        totalTerms={totalTerms}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      />
      <ExportContent
        collectionData={collectionData}
        collectionId={collectionId}
        exportData={currentPageData}
      />
    </div>
  );
}

const BackToThisCollection = ({ collectionId }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <Link href={`/collections/${collectionId}`}>⬅ Back</Link>
    </div>
  );
};

const DataSelection = ({
  setPageSize,
  totalTerms,
  totalPage,
  page,
  setPage,
}) => {
  const pageNums = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div className="flex items-center max-w-5xl mx-auto space-x-4 py-2">
      {/* Page size input */}
      <div className="space-x-2">
        <label htmlFor="page-size-input" className="font-semibold">
          Set page size :
        </label>
        <select
          className="px-2 py-1 bg-blue-100 rounded"
          onChange={(e) => {
            setPageSize(e.target.value * 1);
          }}
          name=""
          id="page-size-input"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value={totalTerms}>All</option>
        </select>
      </div>
      {/* Page input */}
      <div className="space-x-2">
        <label htmlFor="set-page" className="font-semibold">
          Page:
        </label>
        <select
          defaultValue={page}
          onChange={(e) => {
            setPage(e.target.value);
          }}
          name=""
          id="set-page"
          className="px-2 py-1 bg-blue-100 rounded"
        >
          {pageNums.map((item, index) => (
            <option key={`page-${index * 2 + 1}-opt`} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ExportContent = ({ exportData, collectionId, collectionData }) => {
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const [containerWidth, setContainerWidth] = useState(DEFAULT_EXPORT_SIZE);
  const [imageSize, setImageSize] = useState(DEFAULT_IMG_SIZE);
  const [borderRadius, setBorderRadius] = useState(DEFAULT_BORDER_RADIUS);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasProperties, setCanvasProperties] = useState({
    padding: DEFAULT_CANVAS_PADDING,
    bgColor: DEFAULT_CANVAS_BG,
  });
  const contentRef = useRef(null);
  return (
    <div className="mt-4">
      <div className="max-w-5xl mx-auto flex justify-between">
        <ContentContainer
          canvasProperties={canvasProperties}
          borderRadius={borderRadius}
          imageSize={imageSize}
          collectionData={collectionData}
          containerWidth={containerWidth}
          bgColor={bgColor}
          collectionId={collectionId}
          contentRef={contentRef}
          exportData={exportData}
          fontSize={fontSize}
        />
        <StyleSetting
          setBgColor={setBgColor}
          canvasProperties={canvasProperties}
          setCanvasProperties={setCanvasProperties}
          contentRef={contentRef}
          setImageSize={setImageSize}
          setContainerWidth={setContainerWidth}
          setFontSize={setFontSize}
          fontSize={fontSize}
          setBorderRadius={setBorderRadius}
        />
      </div>
    </div>
  );
};

const ExportButton = ({ contentRef }) => {
  return (
    <button
      className="bg-blue-600 text-white h-10 px-4 rounded"
      onClick={() => {
        // console.log(contentRef);
        exportAsImage(contentRef.current, "filename");
      }}
    >
      Export
    </button>
  );
};

const StyleSetting = ({
  setBorderRadius,
  setContainerWidth,
  setBgColor,
  setImageSize,
  setFontSize,
  fontSize,
  contentRef,
  canvasProperties,
  setCanvasProperties,
}) => {
  const [value, setValue] = useState(DEFAULT_EXPORT_SIZE);
  const [size, setSize] = useState(DEFAULT_IMG_SIZE);
  const [border_radius, setBorder_Radius] = useState(DEFAULT_BORDER_RADIUS);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      setContainerWidth(newValue);
    }
  };
  const handleChangeImgSize = (event, newValue) => {
    if (typeof newValue === "number") {
      setSize(newValue);
      setImageSize(newValue);
    }
  };
  const handleChangeBorderRadius = (event, newValue) => {
    if (typeof newValue === "number") {
      setBorder_Radius(newValue);
      setBorderRadius(newValue);
    }
  };
  const handleChangeFontSize = (event, newValue) => {
    if (typeof newValue === "number") {
      setFontSize(newValue);
    }
  };
  return (
    <div className="w-36">
      <LayoutSetting
        value={value}
        size={size}
        border_radius={border_radius}
        fontSize={fontSize}
        handleChange={handleChange}
        handleChangeImgSize={handleChangeImgSize}
        handleChangeBorderRadius={handleChangeBorderRadius}
        handleChangeFontSize={handleChangeFontSize}
        setBgColor={setBgColor}
      />
      <CanvasSetting
        canvasProperties={canvasProperties}
        setCanvasProperties={setCanvasProperties}
      />
      <ExportButton contentRef={contentRef} />
    </div>
  );
};

const ImgMarks = [
  {
    value: 56,
    label: "",
  },
  {
    value: 64,
    label: "",
  },
];

const SizeMarks = [
  {
    value: 500,
    label: "",
  },
  {
    value: 800,
    label: "",
  },
  {
    value: 1000,
    label: "",
  },
];

const LayoutSetting = ({
  value,
  size,
  border_radius,
  fontSize,
  handleChangeFontSize,
  handleChange,
  handleChangeImgSize,
  handleChangeBorderRadius,
  setBgColor,
}) => {
  return (
    <div className="grid grid-rows-5 gap-x-10 gap-y-2 pb-5 min-w-min h-fit">
      <div className="">
        <label className="text-xs" htmlFor="">
          Width: <span className="font-semibold">{value}</span>
        </label>
        <Slider
          marks={SizeMarks}
          size="small"
          onChange={handleChange}
          value={value}
          min={400}
          step={50}
          max={1000}
          className=""
        />
      </div>
      <div className="">
        <label className="text-xs" htmlFor="">
          Image size: <span className="font-semibold">{size}</span>{" "}
        </label>
        <Slider
          size="small"
          marks={ImgMarks}
          onChange={handleChangeImgSize}
          value={size}
          min={40}
          step={1}
          max={100}
          className=""
        />
      </div>
      <div className="">
        <label className="text-xs" htmlFor="">
          Font size: <span className="font-semibold">{fontSize}</span>
        </label>
        <Slider
          size="small"
          onChange={handleChangeFontSize}
          value={fontSize}
          min={0.75}
          step={0.125}
          max={3}
          className=""
        />
      </div>
      <div className="">
        <span
          className="shink-0 flex-1 w-20 line-clamspan-1 text-xs"
          htmlFor=""
        >
          Border:
          <span className="font-semibold break-keep">{border_radius}</span>
        </span>
        <Slider
          size="small"
          onChange={handleChangeBorderRadius}
          value={border_radius}
          min={0}
          step={0.125}
          max={1.5}
          className=""
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs" htmlFor="">
          Bg color
        </label>
        <ColorPicker
          defaultValue="#f0fdf4"
          presets={[
            {
              label: "Recommended",
              colors: tailwindColors,
            },
            {
              label: "Recent",
              colors: [],
            },
          ]}
          onChange={(value, hex) => {
            setBgColor(hex);
          }}
        />
      </div>
    </div>
  );
};

const ContentContainer = ({
  exportData,
  contentRef,
  collectionId,
  containerWidth,
  bgColor,
  collectionData,
  imageSize,
  borderRadius,
  fontSize,
  canvasProperties,
}) => {
  return (
    <div className="flex-1 mx-auto">
      <div
        style={{
          backgroundColor: `${canvasProperties.bgColor}`,
          padding: `${canvasProperties.padding}px`,
        }}
        ref={contentRef}
        className="w-fit mx-auto"
      >
        <ul
          style={{
            fontSize: `${fontSize}rem`,
            height: `${containerWidth}px`,
            width: `${containerWidth}px`,
            backgroundColor: `${bgColor}`,
            borderRadius: `${borderRadius}rem`,
          }}
          className={`p-6 border border-gray-400 flex flex-col justify-between mx-auto rounded-3xl bg-blue-50 overflow-hidden`}
        >
          {/* Title */}
          <li className="text-center">
            <h1
              style={{ fontSize: `${fontSize + 0.125}rem` }}
              className="font-semibold text-center"
            >
              {collectionData?.title}
            </h1>
          </li>
          {/* Term rows */}
          {exportData?.map((item, index) => {
            return (
              <ExportRow imageSize={imageSize} key={item.id} data={item} />
            );
          })}
          {/* Footer */}
          <li className={`flex justify-around`}>
            <div className="flex items-center justify-center space-x-5">
              <p className="text-sm text-center flex items-center justify-center w-full">
                <span className="text-xs text-gray-500">Created with</span>
              </p>

              <img
                alt="Logo image"
                style={{ height: "56px", width: "112px" }}
                src={`/assets/images/logo-text.png`}
              />
            </div>
            <div className="flex justify-between space-x-5">
              <p className="text-sm text-center flex items-center justify-center w-full">
                <span className="text-xs text-gray-500">Scan to learn</span>
              </p>
              <QRCodeCanvas
                size={64}
                value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/collections/${collectionId}`}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ExportRow = ({ data, imageSize }) => {
  return (
    <ul className={`${styles.exportRow} pb-2 border-b border-slate-300`}>
      <li className="relative flex items-center justify-center">
        <div
          style={{ width: imageSize, height: imageSize }}
          className="relative"
        >
          {data.image_url && (
            <Image
              alt={data.term + "image"}
              sizes={`${imageSize}px`}
              fill
              style={{ objectFit: "contain" }}
              src={data.image_url}
            />
          )}
        </div>
      </li>
      <li className="text-blue font-semibold">{data.term}</li>
      <li className="text-blue">{data.definition_2}</li>
      <li className="text-blue flex-1">{data.definition_1}</li>
    </ul>
  );
};

const exportAsImage = async (element, imageFileName) => {
  const canvas = await html2canvas(element, { backgroundColor: null });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
};
const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

const CanvasSetting = ({ canvasProperties, setCanvasProperties }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="pb-5">
      <button
        onClick={() => {
          setOpen((pre) => !pre);
        }}
        className="text-sm flex  items-center   mb-4"
      >
        Canvas{" "}
        <ChevronDownIcon className={`h-4 w-4  ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <div className="text-xs space-y-4">
          {/* Bg color setting */}
          <div className="flex items-center justify-between">
            <div className="h-8 flex items-center ">
              <label className="" htmlFor="">
                Canvas color
              </label>
            </div>

            <ColorPicker
              defaultValue={`${DEFAULT_CANVAS_BG}`}
              presets={[
                {
                  label: "Recommended",
                  colors: tailwindColors,
                },
                {
                  label: "Recent",
                  colors: [],
                },
              ]}
              onChange={(value, hex) => {
                setCanvasProperties((pre) => {
                  return { ...pre, bgColor: hex };
                });
              }}
            />
          </div>
          {/* Size setting */}
          <div className="">
            <span className="" htmlFor="">
              Padding:
              <span className="ml-2 font-semibold break-keep">
                {canvasProperties.padding}
              </span>
            </span>
            <Slider
              value={canvasProperties.padding}
              onChange={(e, newValue) => {
                setCanvasProperties((pre) => {
                  return { ...pre, padding: newValue };
                });
              }}
              size="small"
              min={0}
              step={1}
              max={100}
              className=""
            />
          </div>
        </div>
      )}
    </div>
  );
};
