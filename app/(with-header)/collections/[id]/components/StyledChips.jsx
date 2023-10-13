import React from "react";
import { MuiChipsInput } from "mui-chips-input";
import styled from "@emotion/styled";
const MuiChipsInputStyled = styled(MuiChipsInput)`
  & div.MuiInputBase-root {
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #d1d5db;
    border-radius: 0;
    &:focus-within {
      border-bottom: 2px solid #93c5fd;
    }
  }
  padding: 0;
  margin: 0;
  width: 100%;
  & fieldset {
    border: none;
  }
`;

export default function StyledChips({ chips, setChips }) {
  const handleAddChip = (chipValue) => {
    if (!chips.includes(chipValue)) {
      setChips([...chips, chipValue]);
    } else {
    }
  };
  const handleDeleteChip = (chipValue) => {
    const newChips = [...chips].filter((value) => value !== chipValue);
    setChips(newChips);
  };
  return (
    <MuiChipsInputStyled
      id="my-mui-chipsinput"
      hideClearAll={true}
      value={chips}
      validate={() => {
        return {
          isError: chips.length >= 5,
          textError: "Input max 5 tags",
        };
      }}
      clearInputOnBlur={true}
      onAddChip={handleAddChip}
      onDeleteChip={handleDeleteChip}
    ></MuiChipsInputStyled>
  );
}
