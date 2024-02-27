import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm.tsx";
import { useJwtStore } from "@/stores/useUserStore.ts";
import authorisedNavigationGuard from "@/hooks/authorisedNavigationGuard.ts";

const Login = () => {
  const { jwt, setJwt } = useJwtStore();
  const { token } = authorisedNavigationGuard();
  const navigate = useNavigate();
  document.title = "Listify | Login";

  return (
    <main className="min-h-screen w-screen grid gap-4 items-center bg-bkg">
      <img
        className="place-self-center sm:w-36 md:w-44 lg:w-64"
        src="/logo.svg"
        alt="logo for the app"
      />
      {token?.isExpired && <LoginForm navigate={navigate} />}
      {token?.decodedToken?.isAdmitted === false &&
        token?.decodedToken &&
        !token?.isExpired && (
          <>
            <section className="bg-bkgContrast text-content mx-auto text-center flex flex-col gap-4 sm:w-4/5 md:w-1/2 lg:w-2/6">
              <h1 className="text-2xl font-bold mt-3">WAIT</h1>
              <div className="">
                <p className="text-xl w-4/5 mx-auto">
                  Our team needs to confirm your registration for you to be able
                  to access our platform.
                </p>
                <p className="text-xl w-4/5 mx-auto">
                  Please stay patient, we’re on it!
                </p>
              </div>
              <button className="w-4/5 mx-auto bg-crimson text-white font-bold mb-7 py-2 rounded-xl">
                REFRESH
              </button>
            </section>{" "}
            <section className="bg-bkgContrast text-content text-bkg mx-auto text-center flex flex-col gap-4 sm:w-4/5 md:w-1/2 lg:w-2/6">
              <h1 className="text-2xl font-bold mt-3">Problems?</h1>
              <div className="">
                <p className="text-xl w-4/5 mx-auto">
                  If you think there has been an error, you can contact us via
                  mail:
                </p>
              </div>
              <button className="w-2/5 mx-auto bg-darkBlue text-white font-bold mb-7 py-2 rounded-xl">
                CONTACT
              </button>
            </section>
          </>
        )}
      <section className="flex flex-row  items-center gap-2 justify-center ">
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
              fillRule="evenodd"
              clipRule="evenodd"
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
