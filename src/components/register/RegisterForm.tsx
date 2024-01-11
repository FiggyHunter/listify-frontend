import { TextField, ThemeProvider } from "@mui/material";
import theme from "@/themes/FormTheme";
import sxFormTheme from "@/themes/sxFormTheme";
import useRegisterState from "@/hooks/useRegisterState";
import { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
}

const RegisterForm: React.FC<Props> = ({ navigate }) => {
  const { registerFormData, registerErrors, handleInputChange } =
    useRegisterState();

  return (
    <>
      <div className="bg-white sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col sm:gap-4 md:gap-5 lg:gap-5 mx-auto px-4 h-fit pb-4 self-start rounded-2xl drop-shadow-lg">
        <h1 className="font-bold text-gray-700 mt-4 text-bkg sm:text-xl md:text-2xl text-center font-inter">
          REGISTER
        </h1>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name={"email"}
            error={true}
            value={registerFormData.email}
            helperText={!registerErrors.email ? `Incorrect entry.` : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />{" "}
          <TextField
            id="outlined-basic"
            label="First Name"
            name={"firstName"}
            value={registerFormData.firstName}
            variant="outlined"
            error={false}
            helperText={registerErrors.firstName ? `Incorrect entry.` : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />{" "}
          <TextField
            id="outlined-basic"
            label="Last Name"
            value={registerFormData.lastName}
            variant="outlined"
            name={"lastName"}
            error={false}
            helperText={registerErrors.lastName ? `Incorrect entry.` : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            name={"password"}
            value={registerFormData.password}
            variant="outlined"
            error={true}
            helperText={registerErrors.password ? `Incorrect entry.` : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Confirm Password"
            name={"repeatPassword"}
            value={registerFormData.repeatPassword}
            variant="outlined"
            error={false}
            helperText={registerErrors.repeatPassword ? `Incorrect entry.` : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />
        </ThemeProvider>
        <p
          onClick={() => navigate("/login")}
          className="text-black text-center underline-offset-4 underline decoration-crimson cursor-pointer hover:decoration-crimsonHover "
        >
          Already have an account?
        </p>
        <button className="px-12 rounded-lg bg-darkBlue transition-all duration-250 font-semibold hover:outline-0 border-none hover:bg-darkBlueHover font-inter text-white ">
          REGISTER
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
