import LoaderButton from "@/components/shared/LoaderButton";
import authorisedNavigationGuard from "@/hooks/authorisedNavigationGuard";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import ForgotTheme from "@/themes/ForgotTheme";
import resetPasswordValidation from "@/utilities/validators/ResetPasswordValidation";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const buttonId = "resetPassword";
  const isLoading = buttonLoading[buttonId] || false;
  const navigate = useNavigate();
  const { token } = authorisedNavigationGuard();
  return (
    <>

      <main className="h-screen w-screen grid grid-rows-3 items-center bg-bkg ">
        {" "}
        <img
          onClick={() => navigate("/login")}
          className="place-self-center  sm:w-36 md:w-44 lg:w-64 cursor-pointer"
          src="/logo.svg"
          alt="logo for the app"
        />
        <section className="bg-bkgContrast sm:w-5/6 lg:w-1/3 mx-auto py-6 rounded-3xl flex flex-col">
          <h1 className="text-3xl text-black font-medium font-inter pt-2 text-center">
            FORGOT YOUR PASSWORD
          </h1>
          <div className="w-5/6 mx-auto text-center my-4">
            <TextField
              className="w-full "
              id="outlined-basic"
              type={"email"}
              label="Email"
              name="password"
              placeholder="Please enter your email"
              value={email}
              variant="outlined"
              error={emailError ? true : false}
              helperText={emailError ? emailError : ``}
              sx={ForgotTheme}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin("loginButton", e, navigate);
              }}
              onBlur={() => loginValidation(loginFormData, setLoginErrors)}
            />{" "}
          </div>
          <button
            onClick={() =>
              resetPasswordValidation(
                email,
                setEmailError,
                buttonId,
                setButtonLoading
              )
            }
            className="sm:w-2/3 hover:bg-crimsonHover transition-all focus:outline-none duration-200 text-md mb-2 p-2  lg:w-1/3 rounded-lg mx-auto"
          >
            {isLoading ? <LoaderButton /> : "SEND AN EMAIL"}
          </button>
        </section>
      </main>{" "}
    </>
  );
};

export default ResetPassword;
