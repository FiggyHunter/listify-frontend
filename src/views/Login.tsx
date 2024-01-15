import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm.tsx";
import { useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useJwtStore } from "@/stores/useUserStore.ts";

const Login = () => {
  const { jwt, setJwt } = useJwtStore();
  const token = useJwt(jwt) || null;
  const navigate = useNavigate();
  useEffect(() => {
    if (token.decodedToken && !token.isExpired) {
      navigate("/dashboard");
      return;
    }
  }, [token.decodedToken, navigate]);

  return (
    <main className="h-screen w-screen grid items-center bg-bkg">
      <img
        className="place-self-center sm:w-36 md:w-44 lg:w-64"
        src="/logo.svg"
        alt="logo for the app"
      />
      <LoginForm navigate={navigate} />
      <section className="flex flex-row items-center gap-2 justify-center ">
        <p className="text-content w-max ">Powered by </p>{" "}
        <a target="_blank" href="https://skim.ba/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="21"
            viewBox="0 0 28 21"
            fill="none"
          >
            <rect
              x="16.764"
              y="15.6779"
              width="11.2359"
              height="4.49436"
              className="fill-content"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.9085 10.2495L3.24874 0.589722L0.0707485 3.76772L6.62758 10.3245L0.0707397 16.8814L3.24873 20.0594L12.9085 10.3996L12.8335 10.3246L12.9085 10.2495Z"
              className="fill-content"
            />
          </svg>
        </a>
      </section>
    </main>
  );
};

export default Login;
