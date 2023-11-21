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

const DEFAULT_EXPORT_SIZE = 768;

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
  console.log("currentPageData: ", currentPageData);
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
    <div className="max-w-3xl mx-auto">
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
    <div className="flex items-center max-w-3xl mx-auto space-x-4 py-2">
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
  const [bgColor, setBgColor] = useState("#eff6f");
  const [containerWidth, setContainerWidth] = useState(DEFAULT_EXPORT_SIZE);
  const contentRef = useRef(null);
  return (
    <div className="">
      <ExportButton contentRef={contentRef} />
      <StyleSetting
        setContainerWidth={setContainerWidth}
        setBgColor={setBgColor}
      />
      <ContentContainer
        collectionData={collectionData}
        containerWidth={containerWidth}
        bgColor={bgColor}
        collectionId={collectionId}
        contentRef={contentRef}
        exportData={exportData}
      />
    </div>
  );
};

const ExportButton = ({ contentRef }) => {
  return (
    <div className="flex justify-end max-w-3xl mx-auto py-4">
      <button
        className="bg-blue-600 text-white h-10 px-4 rounded"
        onClick={() => {
          // console.log(contentRef);
          exportAsImage(contentRef.current, "filename");
        }}
      >
        Export
      </button>
    </div>
  );
};

const StyleSetting = ({ setContainerWidth, setBgColor }) => {
  const [value, setValue] = useState(DEFAULT_EXPORT_SIZE);
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      setContainerWidth(newValue);
    }
  };
  return (
    <div className="max-w-3xl mx-auto flex items-center space-x-5">
      <div className="w-60">
        <Slider
          onChange={handleChange}
          value={value}
          min={400}
          step={1}
          max={1080}
          className=""
          valueLabelDisplay="on"
        />
      </div>
      <div className="">
        <ColorPicker
          defaultValue="eff6ff"
          presets={[
            {
              label: "Recommended",
              colors: ["#eff6ff", "#f0fdf4"],
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
}) => {
  return (
    <div className="">
      <ul
        style={{ width: `${containerWidth}px`, backgroundColor: `${bgColor}` }}
        ref={contentRef}
        className="p-6 border border-gray-400 space-y-4 mx-auto rounded-3xl bg-blue-50 overflow-hidden"
      >
        {/* Title */}
        <li className="text-center">
          <h1 className="font-semibold text-2xl text-center">
            {collectionData?.title}
          </h1>
        </li>
        {/* Term rows */}
        {exportData?.map((item, index) => {
          return <ExportRow key={item.id} data={item} />;
        })}
        {/* Footer */}
        <li className={`${styles.exportRow}`}>
          <div className="flex items-center justify-end">
            <p>Create with</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Image alt="Logo image" width={60} height={60} src={Logo} />
            <p className="text-blue-600 font-semibold">UniCard</p>
          </div>

          <div className="flex justify-between rounded p-1">
            <p className="text-sm text-center flex items-center justify-center font-semibold w-full">
              <span className="">Scan to learn</span>
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

const ExportRow = ({ data }) => {
  return (
    <ul className={`${styles.exportRow}  pb-2 border-b border-slate-400`}>
      <li className="relative w-14 h-14 shrink-0">
        {data.image_url && (
          <Image
            alt={data.term + "image"}
            sizes="56px"
            fill
            style={{ objectFit: "contain" }}
            src={data.image_url}
          />
        )}
      </li>
      <li className="text-blue w-40 ml-8 font-semibold">{data.term}</li>
      <li className="text-blue w-40">{data.definition_2}</li>
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
