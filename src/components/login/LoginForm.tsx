import { TextField, ThemeProvider } from "@mui/material";
import theme from "@/themes/FormTheme";
import sxFormTheme from "@/themes/sxFormTheme";
import useLoginState from "@/hooks/useLoginState.ts";
import { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
}

const LoginForm: React.FC<Props> = ({ navigate }) => {
  const { loginFormData, handleInputChange, loginErrors } = useLoginState();

  return (
    <>
      <div className="bg-white sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col sm:gap-3 md:gap-4 lg:gap-6 mx-auto px-4 h-fit pb-4 self-start rounded-2xl drop-shadow-lg">
        <h1 className="font-bold text-gray-700 mt-4 text-bkg sm:text-xl md:text-2xl text-center font-inter">
          LOGIN
        </h1>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            error={loginErrors.email ? true : false}
            value={loginFormData.email}
            helperText={loginErrors.email ? loginErrors.email.message : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />{" "}
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            name="password"
            value={loginFormData.password}
            variant="outlined"
            error={loginErrors.password ? true : false}
            helperText={
              loginErrors.password ? loginErrors.password.message : ``
            }
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />{" "}
        </ThemeProvider>
        <div className="flex items-center justify-between border-b-2 border-gray-400 pb-4 sm:flex-col sm:gap-2 md:flex-row ">
          <p className="text-black">Forgot your password?</p>
          <button className="px-14  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white">
            LOGIN
          </button>
        </div>
        <p className="text-black text-center">Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="px-12 rounded-lg bg-darkBlue transition-all duration-250 font-semibold hover:outline-0 border-none hover:bg-darkBlueHover font-inter text-white "
        >
          REGISTER
        </button>
      </div>
    </>
  );
};

export default LoginForm;
