import { getCompanyById } from "@/api/company";
import { getUserById } from "@/api/user";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewSkeleton from "../profile/ReviewSkeleton";
import getInitials from "@/utilities/getInitialsFromName";

const Reviews = ({ rating, text, userId, jwt, navigate, companyId }) => {
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    return await getUserById(userId, jwt);
  };

  const fetchCompanyName = async () => {
    return await getCompanyById(jwt, setCompany, companyId);
  };

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
    if (companyId)
      fetchCompanyName().then(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [jwt]);

  return isLoading ? (
    <ReviewSkeleton navigate={navigate} />
  ) : (
    <div className="text-content text-left p-4 cursor-default">
      <div className="flex gap-2 sm:justify-center lg:justify-stretch ">
        <div
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
          className="bg-gray-300 self-center w-12 h-12 rounded-full place-content-center grid font-bold text-black cursor-pointer"
        >
          {getInitials(`${user?.name} ${user?.surname}`)}
        </div>
        <section className="rac">
          <h4>{`${user.name ? user.name : "Loading"} ${
            user.surname ? user.surname : "user..."
          }`}</h4>
          <Rating
            className="self-center"
            name="half-rating"
            size="large"
            readOnly
            value={rating}
            precision={0.5}
            sx={{
              fontSize: "1.5rem",
              "& .MuiRating-iconEmpty": {
                color: "#FF9393",
              },
              "& .MuiRating-iconFilled": {
                color: "#E56B6F",
              },
              "& .MuiRating-iconHover": {
                color: "#E56B6F",
              },
            }}
          />
        </section>
      </div>{" "}
      <p className="w-5/6 sm:mx-auto lg:mx-0 mt-2 pl-1 sm:text-center lg:text-left">
        {text}
      </p>
      {navigate && companyId && (
        <div className="mt-4">
          <p className="pl-1.5  inline">Reviewed company:</p>
          <button
            onClick={() => navigate("/company/65b11c7a6f61a60f46860fd7")}
            className="inline-block bg-transparent p-0 ml-1 cursor-pointer text-content hover:text-accent-2"
          >
            {company.name}
          </button>
        </div>
      )}
      <span className="w-full block mt-8 border-b-1 border-gray-500"></span>
    </div>
  );
};

export default Reviews;
