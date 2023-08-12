"use client";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  GridFooter,
} from "@mui/x-data-grid";
import { randomId, useDemoData } from "@mui/x-data-grid-generator";
import { useRef, useState } from "react";

const initialRows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
  { id: 4, col1: "MUI", col2: "is Amazing" },
  { id: 5, col1: "MUI", col2: "is Amazing" },
  { id: 6, col1: "MUI", col2: "is Amazing" },
  { id: 7, col1: "MUI", col2: "Data in row 7" },
  { id: 8, col1: "MUI", col2: "Data in row 8" },
  { id: 9, col1: "MUI", col2: "Data in row 9" },
  { id: 10, col1: "MUI", col2: "Data in row 10" },
  { id: 11, col1: "MUI", col2: "Data in row 11" },
  { id: 12, col1: "MUI", col2: "Data in row 12" },
  { id: 13, col1: "MUI", col2: "Data in row 13" },
];

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "col1",
    headerName: "Term",
    width: 150,
    editable: true,
    editMode: "row",
  },
  {
    field: "col2",
    headerName: "Define 1",
    width: 150,
    editable: true,
    editMode: "row",
  },
  { field: "col3", headerName: "Define 2", width: 150, editable: true },
  { field: "col4", headerName: "Example", width: 150, editable: true },
  { field: "col5", headerName: "Image", width: 150, editable: true },
  { field: "col6", headerName: "Actions", width: 150 },
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

const EditToolbar = (props) => {
  const apiRef = useGridApiContext();
  const { setRows, setRowModesModel } = props;
  const handleAdd = () => {
    const id = randomId();
    const { pageSize } = apiRef.current.state.pagination.paginationModel;
    const rows = apiRef.current.state.rows.totalRowCount + 1;
    const currentPage = Math.ceil(rows / pageSize);
    console.log("current page", currentPage);
    console.log(rows);
    console.log(apiRef.current.state);
    setRows((oldRows) => [
      ...oldRows,
      { id, col1: "", col2: "", col3: "", col4: "", col5: "" },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: "edit", fieldToFocus: "col1" },
    }));
    apiRef.current.startRowEditMode({ id, fieldToFocus: "col1" });
    apiRef.current.setPage(currentPage);
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
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  return (
    <DataGrid
      sx={{
        borderColor: "transparent",
        gap: "1rem",
        "& .MuiDataGrid-toolbarContainer": { p: 0 },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: "white",
          borderRadius: "8px",
        },
        "& .MuiDataGrid-withBorderColor": {
          borderColor: "transparent",
        },
        "& .MuiDataGrid-row": {
          bgcolor: "white",
          borderRadius: "8px",
          mt: "8px",
        },
        "& .MuiDataGrid-main": {
          gap: "8 px",
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
        "& .MuiDataGrid-cell:first-child": {
          borderRadius: "8px 0 0 8px",
        },
        "& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {},
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
      rows={rows}
      columns={columns}
      hideFooterSelectedRowCount
    ></DataGrid>
  );
}
