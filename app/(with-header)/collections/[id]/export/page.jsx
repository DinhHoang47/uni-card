"use client";
import { useCard } from "@lib/useCard";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import Logo from "@public/assets/images/unicard-logo.png";
import html2canvas from "html2canvas";

export default function page({ params }) {
  // Fetched data
  const { data: cardList } = useCard(params.id);
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
    <div className="mt-5 w-full px-8">
      <DataSelection
        setPageSize={setPageSize}
        totalTerms={totalTerms}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      />
      <ExportContent exportData={currentPageData} />
    </div>
  );
}

const DataSelection = ({
  setPageSize,
  totalTerms,
  totalPage,
  page,
  setPage,
}) => {
  const pageNums = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div className="flex items-center justify-between">
      {/* Page size input */}
      <div className="">
        <label htmlFor="page-size-input">Set page size :</label>
        <select
          className="px-2 py-1 bg-transparent"
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
      <div className="">
        <label htmlFor="set-page">Page:</label>
        <select
          defaultValue={page}
          onChange={(e) => {
            setPage(e.target.value);
          }}
          name=""
          id="set-page"
          className="px-2 bg-transparent"
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

const ExportContent = ({ exportData }) => {
  const [bgColor, setBgColor] = useState("");
  const contentRef = useRef(null);
  return (
    <div className="">
      <div className="flex justify-end max-w-3xl mx-auto mb-5">
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

      <ContentContainer contentRef={contentRef} exportData={exportData} />
    </div>
  );
};

const ContentContainer = ({ exportData, contentRef }) => {
  return (
    <div className="">
      <ul
        ref={contentRef}
        className="p-6 border border-gray-400 space-y-4 mx-auto rounded-lg max-w-3xl bg-blue-50"
      >
        {/* Title */}
        <li className="text-center">
          <h1 className="font-semibold text-2xl text-center">
            Vocabulary list
          </h1>
        </li>
        {/* Term rows */}
        {exportData?.map((item, index) => {
          return <ExportRow key={item.id} data={item} />;
        })}
        {/* Footer */}
        <li className="flex justify-between">
          <div className="">
            <Image alt="Logo image" width={60} height={60} src={Logo} />
          </div>
          <div className="">
            <Image alt="QR Code image" width={60} height={60} src={Logo} />
          </div>
        </li>
      </ul>
    </div>
  );
};

const ExportRow = ({ data }) => {
  return (
    <ul className={`${styles.exportRow} flex pb-2 border-b border-slate-400`}>
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
  const canvas = await html2canvas(element);
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
