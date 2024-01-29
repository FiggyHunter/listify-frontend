export default {
  input: {
    color: "black",
    backgroundColor: "transparent",
    WebkitTextFillColor: "black",
    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
    paddingY: "0.75rem !important",
    fontSize: "0.75rem !important",
  },
  "&:hover fieldset": {
    //borderColor: "green!important" // works
    borderColor: "red !important", // doesnt work
  },
  fieldset: {
    border: "1px solid var(--color-content)",
    transition: "border-color 0.3s", // Add transition for smoother hover effect
  },

  label: {
    color: "var(--color-content) !important",
    fontFamily: "Inter, sans-serif !important",
  },
  "#outlined-basic-helper-text": {
    fontFamily: "Inter, sans-serif !important",
  },
  span: {
    fontFamily: "Inter, sans-serif !important",
  },
};
