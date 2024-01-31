import { TextField, ThemeProvider } from "@mui/material";
import theme from "@/themes/FormTheme";
import sxFormTheme from "@/themes/sxFormTheme";
import useRegisterState from "@/hooks/useRegisterState";
import { NavigateFunction } from "react-router-dom";
import registerValidation from "@/utilities/validators/RegisterValidation";
import RegisterButton from "./RegisterButton";

interface Props {
  navigate: NavigateFunction;
}

const RegisterForm: React.FC<Props> = ({ navigate }) => {
  const {
    registerFormData,
    registerErrors,
    handleInputChange,
    handleRegister,
    setRegisterErrors,
  } = useRegisterState();

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
            error={registerErrors.email}
            value={registerFormData.email}
            helperText={registerErrors.email ? registerErrors.email : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            onBlur={() =>
              registerValidation(registerFormData, setRegisterErrors)
            }
          />{" "}
          <TextField
            id="outlined-basic"
            label="First Name"
            name={"firstName"}
            value={registerFormData.firstName}
            variant="outlined"
            error={registerErrors.firstName}
            helperText={
              registerErrors.firstName ? registerErrors.firstName : ``
            }
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            onBlur={() =>
              registerValidation(registerFormData, setRegisterErrors)
            }
          />{" "}
          <TextField
            id="outlined-basic"
            label="Last Name"
            value={registerFormData.lastName}
            variant="outlined"
            name={"lastName"}
            error={registerErrors.lastName}
            helperText={registerErrors.lastName ? registerErrors.lastName : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            onBlur={() =>
              registerValidation(registerFormData, setRegisterErrors)
            }
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            name={"password"}
            value={registerFormData.password}
            variant="outlined"
            error={registerErrors.password}
            helperText={registerErrors.password ? registerErrors.password : ``}
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            onBlur={() =>
              registerValidation(registerFormData, setRegisterErrors)
            }
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Confirm Password"
            name={"repeatPassword"}
            value={registerFormData.repeatPassword}
            variant="outlined"
            error={registerErrors.repeatPassword}
            helperText={
              registerErrors.repeatPassword ? registerErrors.repeatPassword : ``
            }
            sx={sxFormTheme}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            onBlur={() =>
              registerValidation(registerFormData, setRegisterErrors)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRegister(e, navigate);
            }}
          />
        </ThemeProvider>
        <p
          onClick={() => navigate("/login")}
          className="text-black text-center underline-offset-4 underline decoration-crimson cursor-pointer hover:decoration-crimsonHover "
        >
          Already have an account?
        </p>
        <RegisterButton handleRegister={handleRegister} />
      </div>
    </>
  );
};

export default RegisterForm;
