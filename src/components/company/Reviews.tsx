import { getUserById } from "@/api/user";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

const Reviews = ({ rating, text, userId, jwt }) => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    return await getUserById(userId, jwt);
  };

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
    console.log(userId);
  }, []);

  return (
    <div className="text-content text-left p-4 ">
      <div className="flex gap-2 sm:justify-center lg:justify-stretch ">
        <div className="bg-gray-300 self-center w-12 h-12 rounded-full"></div>
        <div className="rac">
          <h4>{`${user.name} ${user.surname}`}</h4>
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
        </div>
      </div>{" "}
      <p className="w-5/6 sm:mx-auto lg:mx-0 mt-2 pl-1 sm:text-center lg:text-left">
        {text}
      </p>
      <span className="w-full block mt-8 border-b-1 border-gray-500"></span>
    </div>
  );
};

export default Reviews;
