import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid grey`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid black`,
            },
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid red`,
            },
          },
        },
      },
    },
  },
});
