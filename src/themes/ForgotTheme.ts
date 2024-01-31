export default {
  input: {
    color: "black !important",
    backgroundColor: "transparent",
    WebkitTextFillColor: "black",
    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
    fontSize: "1rem !important",
  },
  label: {
    color: "black",
    fontFamily: "Inter, sans-serif !important",
    fontWeight: "300",
    backgroundColor: "var(--bkg-contrast)",
  },
  "#outlined-basic-helper-text": {
    fontFamily: "Inter, sans-serif !important",
  },
  span: {
    fontFamily: "Inter, sans-serif !important",
  },

  ".MuiOutlinedInput-root": {
    ":hover": {
      border: "0px solid red !important",
    },
    ":focus": {
      outline: "none !important",
      border: "2px solid blue !important",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #eee",
  },

  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "black ",
  },

  ".MuiChip-root": {
    backgroundColor: "var(--color-content)",
    color: "var(--bkg-contrast)",
  },
  ".MuiChip-deleteIconFilledColorDefault": {
    color: "red",
  },
  ".MuiAutocomplete-input": {
    color: "red !important",
  },
  ".MuiSvgIcon-root": {
    color: "red",
  },
  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid black !important",
    },
  ".MuiChip-deleteIcon": {
    color: "red",
    ":hover": {
      color: "red",
    },
  },
};
