import { Slider as AntdSilder, InputNumber, Input } from "antd";

const DEFAULT_EXPORT_SIZE = 1000; //px
const DEFAULT_IMG_SIZE = 128; //px
const DEFAULT_FONT_SIZE = 2; // tailwind unit
const DEFAULT_BG_COLOR = "#FFFFFF"; // px
const DEFAULT_BORDER_RADIUS = 1.5; // tailwind unit

const DEFAULT_CANVAS_BG = "#dbeafe"; // blue-100
const DEFAULT_CANVAS_PADDING = 40; // px
const DEFAULT_QR_URL = "https://www.nihongo.click";
const DEFAULT_QR_LABEL = "Scan to learn";
const DEFAULT_QR_LABEL_FONT_SIZE = 1;
const DEFAULT_QR_SIZE = 64; // px

export const tailwindColors = [
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

export const ImgMarks = [
  {
    value: 56,
    label: "",
  },
  {
    value: 64,
    label: "",
  },
];

export const SizeMarks = [
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

export const rowPropertyList = [
  {
    order: 1,
    field: "image",
    label: "Image",
    property: [
      {
        id: 1,
        alias: "size",
        label: "Image Size",
        size: DEFAULT_IMG_SIZE,
        controller: InputNumber,
        setting: { max: 500, min: 1 },
      },
    ],
    display: true,
  },
  {
    order: 2,
    field: "term",
    label: "Term",
    property: [
      {
        id: 1,
        label: "Font size",
        fontSize: DEFAULT_FONT_SIZE,
        controller: InputNumber,
        alias: "fontSize",
        setting: { max: 8, min: 0.75, step: 0.125 },
      },
    ],
    display: true,
  },
  {
    order: 3,
    field: "definition",
    label: "Definition",
    property: [
      {
        id: 1,
        label: "Font Size",
        fontSize: DEFAULT_FONT_SIZE,
        controller: InputNumber,
        alias: "fontSize",
        setting: { max: 8, min: 0.75, step: 0.125 },
      },
    ],
    display: true,
  },
  {
    order: 4,
    field: "pronunciation",
    label: "Pronunciation",
    property: [
      {
        id: 1,
        label: "Font Size",
        fontSize: DEFAULT_FONT_SIZE,
        controller: InputNumber,
        alias: "fontSize",
        setting: { max: 8, min: 0.75, step: 0.125 },
      },
    ],
    display: true,
  },
];

export const defaultLayoutProperties = {
  bgColor: DEFAULT_BG_COLOR,
  exportSize: DEFAULT_EXPORT_SIZE,
  imageSize: DEFAULT_IMG_SIZE,
  borderRadius: DEFAULT_BORDER_RADIUS,
  fontSize: DEFAULT_FONT_SIZE,
  termFontSize: DEFAULT_FONT_SIZE,
  definitionFontSize: DEFAULT_FONT_SIZE,
  pronunciationFontSize: DEFAULT_FONT_SIZE,
  canvasPadding: DEFAULT_CANVAS_PADDING,
  canvasColor: DEFAULT_CANVAS_BG,
  qrCodeUrl: DEFAULT_QR_URL,
  qrCodeLabel: DEFAULT_QR_LABEL,
  qrCodeLabelFontSize: DEFAULT_QR_LABEL_FONT_SIZE,
  qrCodeSize: DEFAULT_QR_SIZE,
};

export const colorSettingList = [
  {
    labelName: "Bg color",
    propertyAlias: "bgColor",
    defaultColor: DEFAULT_BG_COLOR,
  },
  {
    labelName: "Canvas color",
    propertyAlias: "canvasColor",
    defaultColor: DEFAULT_CANVAS_BG,
  },
];

// Row properties

export const settingPropertyList = [
  {
    labelName: "Image size",
    propertyAlias: "exportSize",
    min: 800,
    max: 1200,
    step: 50,
    Controller: AntdSilder,
  },
  {
    labelName: "Title font size",
    propertyAlias: "fontSize",
    min: 0.75,
    max: 3,
    step: 0.125,
    Controller: AntdSilder,
  },
  {
    labelName: "Border",
    propertyAlias: "borderRadius",
    min: 0,
    max: 100,
    step: 1,
    Controller: InputNumber,
  },
  {
    labelName: "Canvas padding",
    propertyAlias: "canvasPadding",
    min: 0,
    max: 100,
    step: 4,
    Controller: AntdSilder,
  },
];

export const qrPropertyList = [
  {
    labelName: "Image size",
    propertyAlias: "qrCodeSize",
    min: 40,
    max: 144,
    step: 8,
    Controller: AntdSilder,
  },
  {
    labelName: "Label font size",
    propertyAlias: "qrCodeLabelFontSize",
    min: 0.75,
    max: 3,
    step: 0.125,
    Controller: AntdSilder,
  },
];
