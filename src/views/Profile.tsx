import { getReviewsByUserId } from "@/api/review";
import { getUserById } from "@/api/user";
import Reviews from "@/components/company/Reviews";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ChangeProfileDetails from "@/components/profile/ChangeProfileDetails";
import Navigation from "@/components/shared/Navigation";
import NotFoundCard from "@/components/shared/NotFoundCard";
import userNavigationGuard from "@/hooks/userNavigationGuard";
import { useJwtStore } from "@/stores/useUserStore";
import getInitials from "@/utilities/getInitialsFromName";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const { jwt, setJwt } = useJwtStore();
  const { token } = userNavigationGuard();
  const [reviews, setReviews] = useState([]);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Listify | Profile";
    const fetchUserReviews = async () => {
      if (userId) {
        const user = await getUserById(userId, jwt);
        setUser(user);
        return await getReviewsByUserId(jwt, userId);
      }
      return await getReviewsByUserId(jwt, token?.decodedToken?.user_id);
    };

    fetchUserReviews().then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, [jwt, token.decodedToken]);

  return (
    <>
      <Navigation />
      <main className="h-my-screen bg-bkg pt-28">
        {/* {isWriteReviewOpen && (
          <ReviewPopup
            setIsWriteReviewOpen={setIsWriteReviewOpen}
            companyId={companyId}
            userId={token.decodedToken.user_id}
            jwt={jwt}
          />
        )} */}
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="mx-auto w-4/5">
            <section className="grid sm:grid-cols-1 md:custom-cols-company gap-4 h-min">
              <aside className="sm:block md:sticky top-24 bg-bkgContrast rounded-tl-2xl bg-transparent  h-full pt-0   ">
                <div className="flex flex-col bg-bkgContrast shadow-md rounded-xl pt-5">
                  <div className="sm:w-2/4 lg:w-3/4 rounded-xl h-32 lg:h-56 self-center bg-content font-black text-6xl grid place-content-center text-bkg">
                    {getInitials(
                      user
                        ? `${user.name} ${user.surname}`
                        : `${token?.decodedToken?.name} ${token?.decodedToken?.surname}`
                    )}
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-1 mt-4 w-5/6 mx-auto"></div>
                  <button
                    onClick={() =>
                      setIsChangeModalOpen((prevValue) => !prevValue)
                    }
                    className="w-5/6 group  mx-auto my-4 bg-transparent text-content border-darkBlue flex items-center gap-2 hover:bg-crimson transition-all duration-200 hover:text-white justify-center"
                  >
                    Edit your profile{" "}
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
                </div>{" "}
              </aside>
              <section className="md:pl-16 min-h-96 h-full bg-bkgContrast text-center rounded-tr-2xl flex flex-col py-6 mb-6 gap-3 sm:w-full md:w-auto lg:w-auto">
                <div>
                  <h1 className="text-content font-inter text-2xl sm:text-center md:text-left lg:text-6xl mb-4 font-extrabold">
                    {user
                      ? `${user.name} ${user.surname}`
                      : `${token?.decodedToken?.name}  ${token?.decodedToken?.surname}`}
                  </h1>
                  <h2 className="text-content text-xl font-normal md:text-left sm:text-center">
                    <div className="flex gap-2 lg:justify-normal items-center sm:justify-center">
                      <svg
                        className="fill-content"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
                      </svg>
                      {user ? `${user.email}` : token?.decodedToken?.email}
                    </div>
                  </h2>
                </div>
                <p
                  className={`text-content font-normal text-justify px-2 sm:w-full md:w-5/6 
      }`}
                >
                  {/* {company?.description} */}
                </p>
                <div className="flex text-black items-center pr-6">
                  <span className="relative top-1 w-full h-1 border-gray-400 border-t-1"></span>
                  <span className="relative top-1 w-full h-1 border-gray-400 border-t-1 "></span>
                </div>
                <article className="flex flex-col gap-2 sm:items-center md:items-baseline "></article>
                <article
                  className={`flex flex-col gap-2 overflow-y-scroll custom-overflow`}
                >
                  <h3 className="text-content sm:text-center lg:text-left text-2xl mb-4  text-left  inline-block px-1 font-semibold after:absolute after:-bottom-2  sm:after:left-1/2 lg:after:left-1 after:h-1 after:w-12 after:-translate-y-1 after:bg-gray-300 after:content-[''] sticky top-0 bg-bkgContrast bg-bkg z-20">
                    User Reviews
                  </h3>

                  {reviews?.length !== 0 ? (
                    reviews?.map((review) => (
                      <Reviews
                        key={review.userId}
                        rating={review.rating}
                        text={review.text}
                        userId={review.userId}
                        jwt={jwt}
                        navigate={navigate}
                        companyId={review.companyId}
                      />
                    ))
                  ) : (
                    <NotFoundCard text="This user has no reviews." />
                  )}
                </article>
              </section>
            </section>
          </div>
        )}{" "}
        {isChangeModalOpen && (
          <ChangeProfileDetails
            setIsChangeModalOpen={setIsChangeModalOpen}
            jwt={jwt}
            setJwt={setJwt}
          />
        )}
      </main>
    </>
  );
};

export default Account;
