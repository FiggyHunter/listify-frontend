export default {
  input: {
    color: "var(--color-content) !important",
    backgroundColor: "transparent",
    WebkitTextFillColor: "var(--color-content)",
    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
    fontSize: "1rem !important",
  },
  label: {
    color: "var(--color-content)",
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
    border: "1px solid var(--color-content) !important",
    ":hover": {
      border: "1px solid red !important",
    },
    ":focus": {
      outline: "none !important",
      border: "1px solid red !important",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #eee",
  },

  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "var(--color-content) ",
  },

  "&.MuiOutlinedInput-root.Mui-focused ": {
    border: "1px solid purple !important",
  },

  ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    {
      border: "none !important",
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
  ".MuiInput-root.Mui-focused": {
    border: "1px solid red !important",
  },
  ".MuiChip-deleteIcon": {
    color: "red !important",
    ":hover": {
      color: "red !important",
    },
  },
};
