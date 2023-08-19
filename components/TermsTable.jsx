"use client";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  GridFooter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { randomId, useDemoData } from "@mui/x-data-grid-generator";
import { useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { createPortal } from "react-dom";
import CardPreview from "./CardPreview";

const initialRows = [
  {
    id: 1,
    term: "漢字",
    define1: "KANJI",
    define2: "Meaning",
    examples: "Examples example example example",
    image: "/assets/images/samurai_cartoon.jpg",
  },
  {
    id: 2,
    term: "DataGridPro",
    define1: "is Awesome",
    define2: null,
    image: "/assets/images/collection-icon.jpg",
  },
  {
    id: 3,
    term: "漢字",
    define1: "is Amazing",
    define2: "Meaning",
    examples: "Examples",
    image: "",
  },
  {
    id: 4,
    term: "MUI",
    define1: "is Amazing",
    define2: "Meaning",
    examples: "Examples",
  },
  {
    id: 5,
    term: "MUI",
    define1: "is Amazing",
    define2: "Meaning",
    examples: "Examples",
  },
  { id: 6, term: "MUI", define1: "is Amazing", define2: "Meaning" },
  {
    id: 7,
    term: "MUI",
    define1: "Data in row 7",
    define2: "Meaning",
    examples: "Examples",
  },
  {
    id: 8,
    term: "MUI",
    define1: "Data in row 8",
    define2: "Meaning",
    examples: "Examples",
  },
  { id: 9, term: "MUI", define1: "Data in row 9" },
  { id: 10, term: "MUI", define1: "Data in row 10" },
  { id: 11, term: "MUI", define1: "Data in row 11" },
  { id: 12, term: "MUI", define1: "Data in row 12" },
  { id: 13, term: "MUI", define1: "Data in row 13" },
];

const columns = [
  { field: "id", headerName: "No.", width: 100 },
  {
    field: "term",
    headerName: "Term",
    width: 150,
    editable: true,
    editMode: "row",
  },
  {
    field: "define1",
    headerName: "Define 1",
    width: 150,
    editable: true,
    editMode: "row",
  },
  { field: "define2", headerName: "Define 2", width: 150, editable: true },
  { field: "examples", headerName: "Examples", flex: 1, editable: true },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      if (
        params.value !== "null" &&
        params.value !== undefined &&
        params.value !== ""
      ) {
        return (
          <div className="">
            <Image
              alt={`image-${params.row.term}`}
              width={40}
              height={40}
              src={params.value}
            />
          </div>
        );
      }
      return (
        <div className="relative w-10 h-10 bg-white border border-gray-400 rounded flex items-center justify-center border-dashed cursor-pointer">
          <label
            className="w-full h-full flex items-center justify-center cursor-pointer"
            htmlFor={`${params.row.id}-input-image`}
          >
            <CloudArrowUpIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          </label>
          <input
            id={`${params.row.id}-input-image`}
            className=" cursor-pointer"
            type="file"
            hidden
          />
        </div>
      );
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        label="Ations"
        onClick={() => {
          handleDelete(params);
        }}
        icon={<TrashIcon className="h-5 w-5 text-red-400" />}
      />,
      <GridActionsCellItem
        label="Ations"
        onClick={() => {
          console.log("action param", params);
          const { term, define1, define2, examples, image } = params.row;
          params.row.setCardData({ term, define1, define2, examples, image });
          params.row.setOpen(true);
        }}
        icon={<EyeIcon className="h-5 w-5 text-blue-400" />}
      />,
    ],
  },
];

const EditFooter = () => {
  return (
    <GridFooter>
      <button
        onClick={async () => {
          // await handleAdd();
        }}
        className="h-9 w-full text-white rounded-md bg-blue-600"
      >
        Add Term +
      </button>
    </GridFooter>
  );
};

const handleDelete = (params) => {
  const {
    row: { rows, setRows },
    id,
  } = params;
  const newArr = rows
    .filter((item) => item.id !== id)
    .map((item, index) => {
      return { ...item, id: index + 1 };
    });
  setRows(newArr);
};

const EditToolbar = (props) => {
  const apiRef = useGridApiContext();
  const { setRows, setRowModesModel } = props;
  const inputRef = useRef();
  const handleAdd = () => {
    const { pageSize } = apiRef.current.state.pagination.paginationModel;
    const rows = apiRef.current.state.rows.totalRowCount + 1;
    const id = rows;
    const currentPage = Math.ceil(rows / pageSize);
    console.log("current page", currentPage - 1);
    console.log(rows);
    console.log(apiRef.current);
    setRows((oldRows) => [
      ...oldRows,
      { id, term: "", define1: "", define2: "", examples: "", col5: "" },
    ]);
    apiRef.current.setPage(currentPage - 1);
    apiRef.current.startRowEditMode({ id, fieldToFocus: "term" });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: "edit", fieldToFocus: "term" },
    }));
  };
  return (
    <GridToolbarContainer>
      <button
        onClick={async () => {
          await handleAdd();
        }}
        className="h-10 font-semibold w-full text-gray-400 bg-white rounded-md border border-blue-500"
      >
        Add Term +
      </button>
    </GridToolbarContainer>
  );
};

export default function TermsTable() {
  const [page, setPage] = useState(0);
  const [cardData, setCardData] = useState({});
  const [rows, setRows] = useState(initialRows);
  const [isOpen, setOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});
  const modifiedRows = rows.map((item) => {
    return { ...item, rows, setRows, setOpen, setCardData };
  });

  return (
    <>
      <DataGrid
        sx={{
          fontFamily: "Alef ,sans-serif",
          borderColor: "transparent",
          gap: "1rem",
          "& .MuiDataGrid-toolbarContainer": { p: 0 },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "white",
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "transparent",
          },
          "& .MuiDataGrid-row": {
            bgcolor: "white",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            outlineWidth: "1px",
            outlineColor: "#3b82f6",
            outlineOffset: "-1px",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-row--editing": {
            borderRadius: "8px",
          },
          "& .MuiDataGrid-virtualScroller": {
            pb: "16px",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },
        }}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 100]}
        slots={{
          toolbar: EditToolbar,
          footer: EditFooter,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
          },
        }}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        rows={modifiedRows}
        columns={columns}
        hideFooterSelectedRowCount
        autoHeight
        onPaginationModelChange={(e) => {
          console.log("page model change", e);
        }}
      ></DataGrid>
      {isOpen &&
        createPortal(
          <CardPreview cardData={cardData} isOpen={isOpen} setOpen={setOpen} />,
          document.getElementById("primary-nav")
        )}
    </>
  );
}

// absolute w-full h-full top-0 left-0 right-0 bottom-0 opacity-0
