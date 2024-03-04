import { getCompanyById, getEmployeesByCompany } from "@/api/company";
import { getAllReviewsByCompany } from "@/api/review";
import CompanyRequest from "@/components/company/CompanyRequest";
import Employees from "@/components/company/Employees";
import EmploymentStatus from "@/components/company/EmploymentStatus";
import ReviewPopup from "@/components/company/ReviewPopup";
import Reviews from "@/components/company/Reviews";
import Navigation from "@/components/shared/Navigation";
import NotFoundCard from "@/components/shared/NotFoundCard";
import userNavigationGuard from "@/hooks/userNavigationGuard";
import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Company = () => {
  const params = useParams();
  const { companyId } = params;
  const [displayDescription, setDisplayDescription] = useState(false);
  const { jwt, setJwt } = useJwtStore();
  const { token } = userNavigationGuard();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState();
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyReviews = async () =>
      await getAllReviewsByCompany(companyId, jwt);

    fetchCompanyReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  useEffect(() => {
    getCompanyById(jwt, setCompany, companyId);
    getEmployeesByCompany(jwt, companyId, setEmployees);
  }, [jwt]);

  useEffect(() => {
    document.title = `Listify | ${company?.name ? company.name : "Company"}`;
  }, [company]);

  return (
    <>
      <Navigation />
      {company === null ? (
        <main className="pt-28 bg-bkg h-my-screen">
          <div className="mx-auto w-4/5 grid sm:grid-cols-1 md:custom-cols-company gap-4 h-min">
            <div
              role="status"
              className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div className="flex h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="flex items-center mt-4">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>
              <div className="flex mt-4 h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="flex mt-4 h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <span className="sr-only"></span>
            </div>
            <div className="h-full w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
              {" "}
              <div className="flex h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="flex items-center mt-4">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>{" "}
              <div className="flex mt-4 h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>{" "}
              <div className="flex mt-4 h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>{" "}
              <div className="flex mt-4 h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        </main>
      ) : (
        <main className="h-my-screen bg-bkg pt-28 pb-8 ">
          {isWriteReviewOpen && (
            <ReviewPopup
              setIsWriteReviewOpen={setIsWriteReviewOpen}
              companyId={companyId}
              userId={token.decodedToken.user_id}
              jwt={jwt}
              setReviews={setReviews}
            />
          )}
          {isAddRequestOpen && (
            <CompanyRequest
              jwt={jwt}
              userId={token.decodedToken.user_id}
              companyId={companyId}
              setIsAddRequestOpen={setIsAddRequestOpen}
            />
          )}
          <div className="mx-auto w-4/5">
            <section className="grid sm:grid-cols-1 md:custom-cols-company gap-4 h-min">
              <aside className="sm:block md:sticky top-24 bg-bkgContrast rounded-tl-2xl bg-transparent  h-full pt-0   ">
                <div className="flex flex-col bg-bkgContrast shadow-md rounded-xl pt-5">
                  <img
                    src={company.logo || "/logo.svg"}
                    className="w-32 rounded-xl h-32 lg:h-56 lg:w-3/4 self-center bg-gray-300"
                    alt={`Logo for ${company?.name}`}
                  ></img>{" "}
                  <div className="grid grid-cols-1 gap-1 mt-4 w-5/6 mx-auto">
                    <button
                      aria-label={`This company is ${company?.group}`}
                      className="text-sm mx-auto w-full bg-darkBlue bg-darkBlue hover:bg-darkBlueHover transition-all duration-200"
                    >
                      {company?.group}
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      setIsWriteReviewOpen((prevValue) => !prevValue)
                    }
                    className="w-5/6 group  mx-auto my-4 bg-transparent text-content border-darkBlue flex items-center gap-2 hover:bg-crimson transition-all duration-200 hover:text-white justify-center"
                  >
                    Write a review
                    <svg
                      className="fill-crimson group-hover:fill-white"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_56_1246)">
                        <path
                          className="group-hover:fill-white"
                          d="M8.70273 6.7375L0.718359 14.7188C0.424609 15.0125 0.424609 15.4875 0.718359 15.7781C1.01211 16.0688 1.48711 16.0719 1.77773 15.7781L3.55898 13.9969H5.68398C7.23711 13.9969 8.74336 13.5469 10.0277 12.7156C10.3746 12.4906 10.1996 11.9969 9.78398 11.9969C9.62461 11.9969 9.49648 11.8688 9.49648 11.7094C9.49648 11.5813 9.58086 11.4719 9.69961 11.4344L12.2309 10.675C12.309 10.65 12.3809 10.6094 12.4402 10.55L13.1402 9.85C13.4559 9.53438 13.2309 8.99687 12.7871 8.99687H11.7809C11.6215 8.99687 11.4934 8.86875 11.4934 8.70938C11.4934 8.58125 11.5777 8.47188 11.6965 8.43437L15.1965 7.38438C15.3215 7.34688 15.4277 7.2625 15.4871 7.14375C15.8246 6.4875 15.9996 5.75313 15.9996 5C15.9996 3.71875 15.4902 2.49062 14.584 1.58438L14.4121 1.4125C13.509 0.509375 12.2809 0 10.9996 0C9.71836 0 8.49023 0.509375 7.58398 1.41562L4.34336 4.65625C2.84336 6.15625 1.99961 8.19063 1.99961 10.3125V12.0406L7.92461 6.11875C8.11836 5.925 8.43711 5.925 8.63086 6.11875C8.79961 6.2875 8.82148 6.54375 8.69961 6.7375H8.70273Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_56_1246">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setIsAddRequestOpen(true);
                    }}
                    className="w-5/6 group  mx-auto mb-4 bg-transparent  border-darkBlue flex items-center gap-2 hover:bg-crimson transition-all duration-200 hover:text-white justify-center text-content"
                  >
                    Request Changes
                    <svg
                      className="fill-crimson group-hover:fill-white"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_56_1246)">
                        <path
                          className="group-hover:fill-white"
                          d="M8.70273 6.7375L0.718359 14.7188C0.424609 15.0125 0.424609 15.4875 0.718359 15.7781C1.01211 16.0688 1.48711 16.0719 1.77773 15.7781L3.55898 13.9969H5.68398C7.23711 13.9969 8.74336 13.5469 10.0277 12.7156C10.3746 12.4906 10.1996 11.9969 9.78398 11.9969C9.62461 11.9969 9.49648 11.8688 9.49648 11.7094C9.49648 11.5813 9.58086 11.4719 9.69961 11.4344L12.2309 10.675C12.309 10.65 12.3809 10.6094 12.4402 10.55L13.1402 9.85C13.4559 9.53438 13.2309 8.99687 12.7871 8.99687H11.7809C11.6215 8.99687 11.4934 8.86875 11.4934 8.70938C11.4934 8.58125 11.5777 8.47188 11.6965 8.43437L15.1965 7.38438C15.3215 7.34688 15.4277 7.2625 15.4871 7.14375C15.8246 6.4875 15.9996 5.75313 15.9996 5C15.9996 3.71875 15.4902 2.49062 14.584 1.58438L14.4121 1.4125C13.509 0.509375 12.2809 0 10.9996 0C9.71836 0 8.49023 0.509375 7.58398 1.41562L4.34336 4.65625C2.84336 6.15625 1.99961 8.19063 1.99961 10.3125V12.0406L7.92461 6.11875C8.11836 5.925 8.43711 5.925 8.63086 6.11875C8.79961 6.2875 8.82148 6.54375 8.69961 6.7375H8.70273Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_56_1246">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>{" "}
                  <div className="w-5/6 mx-auto text-center">
                    <EmploymentStatus
                      jwt={jwt}
                      companyId={companyId}
                      userId={token?.decodedToken?.user_id}
                      employees={employees}
                      fetchEmployees={() =>
                        getEmployeesByCompany(jwt, companyId, setEmployees)
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col  bg-bkgContrast shadow-md rounded-xl mt-8">
                  <h3 className="text-content text-center  outline-offset-4 pt-4 font-medium">
                    CURRENTLY EMPLOYED
                  </h3>
                  <span className="w-full border-b-2 border-content mt-4"></span>
                  {employees && employees?.length >= 0 ? (
                    employees?.map((employee) => (
                      <Employees employee={employee} />
                    ))
                  ) : (
                    <div
                      role="status"
                      className="sm:flex sm:flex-col sm:items-center md:grid md:custom-cols-dash gap-4 w-full mx-auto text-bkg animate-pulse  "
                    >
                      <div className="w-48 rounded-xl h-16 lg:h-32 self-center bg-gray-300"></div>
                      <div className="flex flex-col items-center justify-between">
                        <div className="w-full flex sm:flex-col md:flex-col justify-between text-black">
                          <p className="font-inter text-lg mb-2">
                            <span className="font-black text-content">HQ:</span>
                          </p>
                          <div className="flex gap-2 mb-2">
                            <div className="py-1 px-2 text-bkgContrast text-sm lg:w-20 sm:w-16 h-8 sm:h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div className="py-1 px-2 text-bkgContrast text-sm lg:w-20 sm:w-16 h-8 sm:h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </div>
                        <div className="flex flex-col  gap-2 text-black w-full py-2 ">
                          <div className="text-2xl items-start h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                          <div className="text-md sm:hidden md:block lg:block h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>{" "}
                          <div className="text-md sm:hidden md:block lg:block h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
              <section className="md:pl-16 min-h-96 h-full bg-bkgContrast text-center rounded-tr-2xl flex flex-col py-6 mb-6 gap-6 sm:w-full md:w-auto lg:w-auto">
                <div>
                  <h1 className="text-content font-inter text-2xl sm:text-center md:text-left lg:text-6xl mb-4 font-extrabold whitespace-pre-wrap">
                    {company?.name}
                  </h1>
                  <h2 className="text-content text-xl font-normal md:text-left sm:text-center">
                    <span className="font-bold">HQ:</span> {company?.hq?.name}
                  </h2>
                </div>
                <p
                  className={`text-content font-normal text-left sm:mx-auto md:mx-0 sm:w-5/6 md:w-5/6 ${
                    displayDescription ? "" : "line-clamp-2"
                  }`}
                >
                  {company?.description}
                </p>
                <div className="flex text-black items-center">
                  <span className="relative top-1 w-full h-1 border-gray-400 border-t-1"></span>
                  <p
                    onClick={() =>
                      setDisplayDescription(
                        (prevDescription) => !prevDescription
                      )
                    }
                    className="block px-4 text-center whitespace-nowrap cursor-pointer text-content"
                  >
                    READ MORE
                  </p>
                  <span className="relative top-1 w-full h-1 border-gray-400 border-t-1"></span>
                </div>
                <article className="flex flex-col gap-2 sm:items-left md:items-baseline px-2 ">
                  <div className="flex items-center gap-2   ">
                    <svg
                      className="fill-darkBlue"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                    >
                      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                    </svg>
                    <a
                      className="text-content underline underline-offset-2 cursor-pointer block text-wrap break-all	"
                      href={`${company?.linkedinURL}`}
                      target="_blank"
                    >
                      {company?.linkedinURL}
                    </a>
                  </div>
                  <div className="pl-1 flex gap-3 ">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_55_1137)">
                        <path
                          d="M1.65 0C0.739062 0 0 0.739062 0 1.65V15.95C0 16.8609 0.739062 17.6 1.65 17.6H4.95V14.85C4.95 13.9391 5.68906 13.2 6.6 13.2C7.51094 13.2 8.25 13.9391 8.25 14.85V17.6H11.55C12.4609 17.6 13.2 16.8609 13.2 15.95V1.65C13.2 0.739062 12.4609 0 11.55 0H1.65ZM2.2 8.25C2.2 7.9475 2.4475 7.7 2.75 7.7H3.85C4.1525 7.7 4.4 7.9475 4.4 8.25V9.35C4.4 9.6525 4.1525 9.9 3.85 9.9H2.75C2.4475 9.9 2.2 9.6525 2.2 9.35V8.25ZM6.05 7.7H7.15C7.4525 7.7 7.7 7.9475 7.7 8.25V9.35C7.7 9.6525 7.4525 9.9 7.15 9.9H6.05C5.7475 9.9 5.5 9.6525 5.5 9.35V8.25C5.5 7.9475 5.7475 7.7 6.05 7.7ZM8.8 8.25C8.8 7.9475 9.0475 7.7 9.35 7.7H10.45C10.7525 7.7 11 7.9475 11 8.25V9.35C11 9.6525 10.7525 9.9 10.45 9.9H9.35C9.0475 9.9 8.8 9.6525 8.8 9.35V8.25ZM2.75 3.3H3.85C4.1525 3.3 4.4 3.5475 4.4 3.85V4.95C4.4 5.2525 4.1525 5.5 3.85 5.5H2.75C2.4475 5.5 2.2 5.2525 2.2 4.95V3.85C2.2 3.5475 2.4475 3.3 2.75 3.3ZM5.5 3.85C5.5 3.5475 5.7475 3.3 6.05 3.3H7.15C7.4525 3.3 7.7 3.5475 7.7 3.85V4.95C7.7 5.2525 7.4525 5.5 7.15 5.5H6.05C5.7475 5.5 5.5 5.2525 5.5 4.95V3.85ZM9.35 3.3H10.45C10.7525 3.3 11 3.5475 11 3.85V4.95C11 5.2525 10.7525 5.5 10.45 5.5H9.35C9.0475 5.5 8.8 5.2525 8.8 4.95V3.85C8.8 3.5475 9.0475 3.3 9.35 3.3ZM15.4 0C14.7916 0 14.3 0.491562 14.3 1.1V17.6H16.5V6.6H21.45C21.7525 6.6 22 6.3525 22 6.05V1.65C22 1.3475 21.7525 1.1 21.45 1.1H16.5C16.5 0.491562 16.0084 0 15.4 0Z"
                          fill="#2E5077"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_55_1137">
                          <rect width="22" height="17.6" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="text-content">
                      Headquarters in: {company?.hq?.name}{" "}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <svg
                      className="fill-darkBlue"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                    >
                      <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
                    </svg>{" "}
                    <p className="text-content">
                      Other offices:{" "}
                      {company &&
                        company.countries.map((country, index) => {
                          return index === company.countries.length - 1
                            ? country.name
                            : country.name + ",";
                        })}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <svg
                      className="fill-darkBlue"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                    >
                      <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z"></path>
                    </svg>
                    <div className="flex w-full flex-wrap">
                      <p className="text-content">Categories: </p>
                      {company?.categories?.map((category, index) => (
                        <p className="text-content w-max" key={index}>
                          {category?.name}
                          {index !== company?.categories?.length - 1 && ","}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
                <article
                  className={`flex flex-col gap-2 overflow-y-scroll custom-overflow  ${
                    reviews.length !== 0 ? "h-96" : ""
                  } `}
                >
                  <h3 className="text-content sm:text-center lg:text-left text-2xl mb-4  text-left  inline-block px-1 font-semibold after:absolute after:-bottom-2  sm:after:left-1/2 lg:after:left-1 after:h-1 after:w-12 after:-translate-y-1 after:bg-gray-300 after:content-[''] sticky top-0 bg-bkgContrast bg-bkg z-20">
                    Reviews
                  </h3>
                  {reviews && reviews?.length !== 0 ? (
                    reviews?.map((review) => (
                      <Reviews
                        key={review.userId}
                        rating={review.rating}
                        text={review.text}
                        userId={review.userId}
                        jwt={jwt}
                        navigate={navigate}
                      />
                    ))
                  ) : (
                    <NotFoundCard text="This company has no reviews." />
                  )}
                </article>
              </section>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Company;
