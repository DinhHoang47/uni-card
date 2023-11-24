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

const DEFAULT_EXPORT_SIZE = 600; //px
const DEFAULT_IMG_SIZE = 56; //px
const DEFAULT_ROW_SPACE = 5; // tailwind unit
const DEFAULT_BG_COLOR = "#f0fdf4"; // px
const DEFAULT_BORDER_RADIUS = 0.5; // tailwind unit

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
    <div className="max-w-4xl mx-auto">
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
    <div className="flex items-center max-w-4xl mx-auto space-x-4 py-2">
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
  const [rowSpace, setRowSpace] = useState(DEFAULT_ROW_SPACE);
  const [properties, setProperties] = useState({
    boderRadius: DEFAULT_BORDER_RADIUS,
  });
  const contentRef = useRef(null);
  return (
    <div className="mt-4">
      <div className="max-w-4xl mx-auto flex justify-between">
        <ContentContainer
          borderRadius={borderRadius}
          imageSize={imageSize}
          collectionData={collectionData}
          containerWidth={containerWidth}
          bgColor={bgColor}
          collectionId={collectionId}
          contentRef={contentRef}
          exportData={exportData}
          rowSpace={rowSpace}
        />
        <StyleSetting
          contentRef={contentRef}
          setImageSize={setImageSize}
          setContainerWidth={setContainerWidth}
          setBgColor={setBgColor}
          setRowSpace={setRowSpace}
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
  setRowSpace,
  contentRef,
  properties,
}) => {
  const [value, setValue] = useState(DEFAULT_EXPORT_SIZE);
  const [size, setSize] = useState(DEFAULT_IMG_SIZE);
  const [border_radius, setBorder_Radius] = useState(DEFAULT_BORDER_RADIUS);
  const [row_space, set_Row_Space] = useState(DEFAULT_ROW_SPACE);

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
  const handleChangeRowSpace = (event, newValue) => {
    if (typeof newValue === "number") {
      set_Row_Space(newValue);
      setRowSpace(newValue);
    }
  };
  return (
    <div className="">
      <LayoutSetting
        value={value}
        size={size}
        border_radius={border_radius}
        row_space={row_space}
        handleChange={handleChange}
        handleChangeImgSize={handleChangeImgSize}
        handleChangeBorderRadius={handleChangeBorderRadius}
        handleChangeRowSpace={handleChangeRowSpace}
        setBgColor={setBgColor}
      />
      <ExportButton contentRef={contentRef} />
    </div>
  );
};

const LayoutSetting = ({
  value,
  size,
  border_radius,
  row_space,
  handleChange,
  handleChangeImgSize,
  handleChangeBorderRadius,
  handleChangeRowSpace,
}) => {
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
  return (
    <div className="grid grid-rows-5 gap-x-10 gap-y-2 pb-5 min-w-min h-fit">
      <div className="">
        <label className="text-xs" htmlFor="">
          Width: <span className="font-semibold">{value}</span>
        </label>
        <Slider
          size="small"
          onChange={handleChange}
          value={value}
          min={400}
          step={1}
          max={800}
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
          Row space: <span className="font-semibold">{row_space}</span>
        </label>
        <Slider
          size="small"
          onChange={handleChangeRowSpace}
          value={row_space}
          min={0}
          step={1}
          max={10}
          className=""
        />
      </div>
      <div className="">
        <span
          className="shink-0 flex-1 w-20 line-clamspan-1 text-xs"
          htmlFor=""
        >
          Border:{" "}
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
              colors: ["#dbeafe", "#eff6ff", "#f0fdf4"],
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
  rowSpace,
}) => {
  return (
    <div className="flex-1 mx-auto">
      <ul
        style={{
          width: `${containerWidth}px`,
          backgroundColor: `${bgColor}`,
          borderRadius: `${borderRadius}rem`,
        }}
        ref={contentRef}
        className={`p-6 border border-gray-400 space-y-${rowSpace} mx-auto rounded-3xl bg-blue-50 overflow-hidden`}
      >
        {/* Title */}
        <li className="text-center">
          <h1 className="font-semibold text-2xl text-center">
            {collectionData?.title}
          </h1>
        </li>
        {/* Term rows */}
        {exportData?.map((item, index) => {
          return <ExportRow imageSize={imageSize} key={item.id} data={item} />;
        })}
        {/* Footer */}
        <li className={`${styles.exportRow}`}>
          <div className="flex items-center justify-end">
            <p className="text-xs">Created with</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Image alt="Logo image" width={40} height={40} src={Logo} />
            <p className="text-blue-600 font-semibold">UniCard</p>
          </div>

          <div className="flex justify-between rounded p-1">
            <p className="text-sm text-center flex items-center justify-center font-semibold w-full">
              <span className="text-xs">Scan to learn</span>
            </p>
          </div>
          <div className="">
            <QRCodeCanvas
              size={64}
              value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/collections/${collectionId}`}
            />
          </div>
          <div className=""></div>
        </li>
      </ul>
    </div>
  );
};

const ExportRow = ({ data, imageSize }) => {
  return (
    <ul className={`${styles.exportRow} pb-2 border-b border-slate-400`}>
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
