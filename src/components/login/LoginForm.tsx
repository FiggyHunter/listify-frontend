import { TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import theme from "@/themes/LoginFormTheme";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="bg-white sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-6 mx-auto px-4 h-fit pb-4 self-start">
        <h1 className="font-bold text-gray-700 mt-4 text-bkg text-3xl text-center font-inter">
          LOGIN
        </h1>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            error={false}
            value={email}
            helperText={false ? `Incorrect entry.` : ``}
            sx={{
              input: {
                color: "black",
                backgroundColor: "transparent",
                WebkitTextFillColor: "black",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
              },
              fieldset: {
                borderColor: "gray",
                "&:focus": {
                  borderColor: "red !important",
                },
                "& MuiOutlinedInput-notchedOutline": {
                  borderColor: "red !important",
                },
              },
              label: {
                color: "gray !important",
                fontFamily: "Inter, sans-serif !important",
              },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
          />{" "}
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            value={password}
            variant="outlined"
            error={true}
            helperText={true ? `Incorrect entry.` : ``}
            sx={{
              input: {
                color: "black",
                backgroundColor: "transparent",
                WebkitTextFillColor: "black",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
              },
              label: {
                color: "gray !important",
                fontFamily: "Inter, sans-serif !important",
                fontWeight: "300",
              },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />{" "}
        </ThemeProvider>
        <div className="flex items-center justify-between border-b-2 border-gray-400 pb-4 sm:flex-col sm:gap-2 md:flex-row">
          <p className="text-black">Forgot your password?</p>
          <button className="px-14 rounded-xl hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white">
            LOGIN
          </button>
        </div>
        <p className="text-black text-center">Don't have an account?</p>
        <button className="px-12 bg-darkBlue transition-all duration-250 font-semibold hover:outline-0 border-none hover:bg-darkBlueHover font-inter text-white ">
          REGISTER
        </button>
      </div>
    </>
  );
};

export default LoginForm;
