import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid var(--color-content)`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid red`,
            },
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid red`,
            },
          },
          "& .MuiInputBase-input": {
            color: "var(--color-content) ",
            placeholder: "white",
          },
        },
      },
    },
  },
});
