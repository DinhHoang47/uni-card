"use client";
import { useCard } from "@lib/useCard";
import Image from "next/image";
import React, { forwardRef, useRef, useState } from "react";
import styles from "./styles.module.css";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import { ColorPicker } from "antd";
import { useCollection } from "@lib/useCollection";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  colorSettingList,
  defaultLayoutProperties,
  qrPropertyList,
  rowPropertyList,
  settingPropertyList,
  tailwindColors,
} from "./config/config";
import ContentSetting from "./components/ContentSetting";

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
    <div className="max-w-7xl mx-auto">
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
    <div className="flex items-center max-w-7xl mx-auto space-x-4 py-2">
      {/* Page size input */}
      <div className="space-x-2">
        <label htmlFor="page-size-input" className="font-semibold">
          Set page size :
        </label>
        <select
          className="px-2 py-1 bg-zinc-100 rounded"
          onChange={(e) => {
            setPageSize(e.target.value * 1);
          }}
          name=""
          id="page-size-input"
        >
          <option value="5">5</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
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
          className="px-2 py-1 bg-zinc-100 rounded"
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
  // Fetched data
  const [rowProperty, setRowProperty] = useState(rowPropertyList);
  const [layoutProperties, setLayoutProperties] = useState(
    defaultLayoutProperties
  );
  const contentRef = useRef(null);
  // Local state
  const displayCols = rowProperty.filter((item) => item.display === true);
  const totalCols = displayCols.length;
  return (
    <div className="mt-4">
      <div className="max-w-7xl mx-auto flex justify-between ">
        <ContentSetting
          rowProperty={rowProperty}
          setRowProperty={setRowProperty}
        />
        <ContentContainer
          totalCols={totalCols}
          layoutProperties={layoutProperties}
          collectionData={collectionData}
          collectionId={collectionId}
          exportData={exportData}
          contentRef={contentRef}
          rowProperty={rowProperty}
        />
        <StyleSetting
          collectionData={collectionData}
          layoutProperties={layoutProperties}
          setLayoutProperties={setLayoutProperties}
          contentRef={contentRef}
        />
      </div>
    </div>
  );
};

const ExportButton = ({ contentRef, collectionData }) => {
  return (
    <button
      className="bg-blue-600 text-white h-10 px-4 rounded w-full"
      onClick={() => {
        exportAsImage(contentRef.current, collectionData.title);
      }}
    >
      Export
    </button>
  );
};

const StyleSetting = ({
  contentRef,
  layoutProperties,
  setLayoutProperties,
  collectionData,
}) => {
  return (
    <div className="w-60 shrink-0 bg-zinc-100 px-4 py-5 rounded-md ml-4">
      <LayoutSetting
        setLayoutProperties={setLayoutProperties}
        layoutProperties={layoutProperties}
      />
      <FooterSetting
        setLayoutProperties={setLayoutProperties}
        layoutProperties={layoutProperties}
      />
      <ExportButton contentRef={contentRef} collectionData={collectionData} />
    </div>
  );
};

const LayoutSetting = ({ layoutProperties, setLayoutProperties }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className=" pb-5 min-w-min">
      <button
        onClick={() => {
          setOpen((pre) => !pre);
        }}
        className="font-semibold text-sm flex items-center -ml-3"
      >
        <span className="pr-1">
          <ChevronDownIcon className={`h-4 w-4 ${open ? "" : "-rotate-90"}`} />
        </span>
        Size & Properties
      </button>
      <div className={`pl-2 ${open ? "h-auto" : "h-0 overflow-hidden"} mt-2`}>
        {settingPropertyList.map((data, index) => {
          return (
            <LayoutSettingItem
              key={data.propertyAlias}
              data={data}
              layoutProperties={layoutProperties}
              setLayoutProperties={setLayoutProperties}
            />
          );
        })}
        {colorSettingList.map((data) => {
          return (
            <ColorSettingItem
              key={data.propertyAlias}
              data={data}
              layoutProperties={layoutProperties}
              setLayoutProperties={setLayoutProperties}
            />
          );
        })}
      </div>
    </div>
  );
};

const FooterSetting = ({ layoutProperties, setLayoutProperties }) => {
  const [open, setOpen] = useState(true);
  const [url, setUrl] = useState(layoutProperties.qrCodeUrl);
  const [edittingQR, setEdittingQR] = useState(false);
  return (
    <div className=" pb-5 min-w-min">
      <button
        onClick={() => {
          setOpen((pre) => !pre);
        }}
        className="font-semibold text-sm flex items-center -ml-3"
      >
        <span className="pr-1">
          <ChevronDownIcon className={`h-4 w-4 ${open ? "" : "-rotate-90"}`} />
        </span>
        Footer setting
      </button>
      <div className={`pl-2 ${open ? "h-auto" : "h-0 overflow-hidden"} mt-2`}>
        {/* URL setting */}
        <div className="relative">
          <div className="">
            <label htmlFor="" className="text-xs">
              QR URL
            </label>
            {edittingQR ? (
              <textarea
                className="text-xs outline-none w-full p-1"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                value={url}
                type="text"
              />
            ) : (
              <p className="text-xs p-1 text-blue-500">
                {layoutProperties.qrCodeUrl}
              </p>
            )}
          </div>
          {edittingQR ? (
            <div className="flex space-x-2 cursor-pointer justify-end absolute top-0 right-0">
              <CheckCircleIcon
                onClick={() => {
                  setEdittingQR(false);
                  setLayoutProperties((pre) => {
                    return { ...pre, qrCodeUrl: url };
                  });
                }}
                className="h-5 w-5 text-green-500 hover:bg-green-100"
              />
              <XMarkIcon
                onClick={() => {
                  setEdittingQR(false);
                  setUrl(layoutProperties.qrCodeUrl);
                }}
                className="h-5 w-5 text-orange-500 hover:bg-orange-100"
              />
            </div>
          ) : (
            <div className="flex justify-end absolute right-0 top-0">
              <PencilSquareIcon
                onClick={() => {
                  setEdittingQR(true);
                }}
                className="h-5 w-5 text-blue-500"
              />
            </div>
          )}
        </div>
        {/* Size setting */}
        {qrPropertyList.map((data, index) => {
          return (
            <LayoutSettingItem
              key={data.propertyAlias}
              data={data}
              layoutProperties={layoutProperties}
              setLayoutProperties={setLayoutProperties}
            />
          );
        })}
        {/* Label setting */}
        <div className="flex flex-col">
          <label htmlFor="qrCodeLabel" className="text-xs py-1">
            Label
          </label>
          <input
            className="outline-none focus:border-b border-blue-400 text-xs p-1 mt-1"
            id="qrCodeLabel"
            type="text"
            value={layoutProperties.qrCodeLabel}
            onChange={(e) => {
              setLayoutProperties((pre) => {
                return { ...pre, qrCodeLabel: e.target.value };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ColorSettingItem = ({ data, setLayoutProperties, layoutProperties }) => {
  const { labelName, defaultColor, propertyAlias } = data;
  return (
    <div className="flex flex-1 items-center justify-between h-[34px]">
      <label className="text-xs flex" htmlFor="">
        {labelName}{" "}
      </label>
      <ColorPicker
        presets={[
          {
            label: "Recommended",
            colors: tailwindColors,
          },
        ]}
        value={layoutProperties[propertyAlias]}
        defaultValue={defaultColor}
        onChange={(_, hex) => {
          setLayoutProperties((pre) => {
            return { ...pre, [propertyAlias]: hex };
          });
        }}
      />
    </div>
  );
};

const LayoutSettingItem = ({ data, layoutProperties, setLayoutProperties }) => {
  const { labelName, propertyAlias, min, max, step, Controller } = data;
  return (
    <div className="flex flex-1 items-center justify-between h-[34px]">
      <label className="text-xs flex" htmlFor="">
        {labelName}{" "}
      </label>
      <Controller
        className="w-20"
        value={layoutProperties[propertyAlias]}
        min={min}
        max={max}
        step={step}
        onChange={(newValue) => {
          setLayoutProperties((pre) => {
            return { ...pre, [propertyAlias]: newValue };
          });
        }}
      />
    </div>
  );
};

// Data to display scale 0.5

const ContentContainer = ({
  exportData,
  collectionData,
  layoutProperties,
  contentRef,
  rowProperty,
  totalCols,
  collectionId,
}) => {
  return (
    <div className="relative flex-1 mx-auto border border-gray-200 rounded-lg shadow p-4 bg-white flex items-center justify-center overflow-scroll h-[620px]">
      <div id={"exportElementStorage"} className="w-0 h-0"></div>
      <div
        ref={contentRef}
        style={{
          backgroundColor: `${layoutProperties.canvasColor}`,
          padding: `${layoutProperties.canvasPadding}px`,
          transform: "scale(0.375)",
        }}
        className="w-fit absolute"
      >
        <ul
          style={{
            fontSize: `${layoutProperties.fontSize}rem`,
            height: `${layoutProperties.exportSize}px`,
            width: `${layoutProperties.exportSize}px`,
            backgroundColor: `${layoutProperties.bgColor}`,
            borderRadius: `${layoutProperties.borderRadius}%`,
          }}
          className={`p-6 border border-gray-400 flex flex-col justify-between mx-auto rounded-3xl bg-blue-50 overflow-hidden`}
        >
          {/* Title */}
          <li className="text-center">
            <h1
              style={{ fontSize: `${layoutProperties.fontSize + 0.125}rem` }}
              className="font-semibold text-center"
            >
              {collectionData?.title}
            </h1>
          </li>
          {/* Term rows */}
          {exportData?.map((item, index) => {
            return (
              <li key={item.id} className="">
                <ExportRow
                  totalCols={totalCols}
                  rowProperty={rowProperty}
                  layoutProperties={layoutProperties}
                  data={item}
                />
              </li>
            );
          })}
          {/* Footer */}
          <li className={`flex justify-around`}>
            <div className="flex items-center justify-center space-x-5">
              <p className="text-sm text-center flex items-center justify-center w-full">
                <span
                  style={{
                    fontSize: `${layoutProperties.qrCodeLabelFontSize}rem`,
                  }}
                  className="text-gray-500"
                >
                  Created with
                </span>
              </p>

              <img
                alt="Logo image"
                style={{ height: `${layoutProperties.qrCodeSize}px` }}
                src={`/assets/images/logo-text.png`}
              />
            </div>
            <div className="flex justify-between space-x-5">
              <p className="text-sm text-center flex items-center justify-center w-full">
                <span
                  style={{
                    fontSize: `${layoutProperties.qrCodeLabelFontSize}rem`,
                  }}
                  className="text-xs text-gray-500"
                >
                  {layoutProperties.qrCodeLabel}
                </span>
              </p>
              <QRCodeCanvas
                size={layoutProperties.qrCodeSize}
                value={layoutProperties.qrCodeUrl}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ExportRow = ({ data, layoutProperties, rowProperty, totalCols }) => {
  const ImageBlock = ({ property }) => {
    const style = property[0];
    return (
      <li className="relative flex items-center justify-center">
        <div
          style={{
            width: style.size,
            height: style.size,
          }}
          className="relative"
        >
          {data.image_url && (
            <Image
              alt={data.term + "image"}
              sizes={`${style.size}px`}
              fill
              style={{ objectFit: "contain" }}
              src={data.image_url}
            />
          )}
        </div>
      </li>
    );
  };
  const TermBlock = ({ property }) => {
    const style = property[0];
    return (
      <li
        style={{ fontSize: `${style.fontSize}rem` }}
        className="text-blue font-semibold break-keep"
      >
        {data.term}
      </li>
    );
  };
  const PronunciationBlock = ({ property }) => {
    const style = property[0];
    return (
      <li style={{ fontSize: `${style.fontSize}rem` }} className="break-keep">
        {data.definition_2}
      </li>
    );
  };
  const DefinitionBlock = ({ property }) => {
    const style = property[0];
    return (
      <li style={{ fontSize: `${style.fontSize}rem` }} className="break-keep">
        {data.definition_1}
      </li>
    );
  };
  const RowMarkups = [
    { label: "image", Element: ImageBlock },
    { label: "term", Element: TermBlock },
    { label: "definition", Element: DefinitionBlock },
    { label: "pronunciation", Element: PronunciationBlock },
  ];
  const renderElement = [];
  // Find label of element by loop through property array
  rowProperty.forEach((item, index) => {
    let element = rowProperty.find((item) => item.order === index + 1);
    let fieldName = element.field;
    let elementToPush = RowMarkups.find((item) => item.label === fieldName);
    if (element.display) {
      renderElement.push({ ...elementToPush, ...element });
    }
  });
  // Dynamic grid layout style
  let gridStyle;
  switch (totalCols) {
    case 4:
      gridStyle = styles.exportRowCols4;
      break;
    case 3:
      gridStyle = styles.exportRowCols3;
      break;
    case 2:
      gridStyle = styles.exportRowCols2;
      break;
  }
  return (
    <ul
      className={`${styles.exportRow} ${gridStyle} pb-2 border-b border-slate-300 space-x-10`}
    >
      {renderElement.map((item) => {
        const Component = item.Element;
        return <Component property={item.property} key={item.label} />;
      })}
    </ul>
  );
};

const exportAsImage = async (element, imageFileName) => {
  // Create a clone element to remove scale property before export
  element.style.removeProperty("transform");
  const canvas = await html2canvas(element, { backgroundColor: null });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
  element.style.setProperty("transform", "scale(0.375)");
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
