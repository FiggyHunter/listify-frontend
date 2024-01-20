import { Rating } from "@mui/material";
import React from "react";

const Reviews = () => {
  return (
    <div className="text-content text-left">
      <div className="flex gap-2">
        <div className="bg-gray-300 self-center w-12 h-12 rounded-full"></div>
        <div className="rac">
          <h4>Name Nameson</h4>
          <Rating
            className="self-center"
            name="half-rating"
            size="large"
            readOnly
            value={4.5}
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
      <p className="w-5/6 pl-1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ea
        autem rem officia. Reiciendis, assumenda enim quo animi magnam minima id
        ipsam nam harum quisquam voluptatibus ab? Sapiente officiis beatae
        eligendi suscipit, ex maiores nobis saepe sequi voluptates, quasi
        reiciendis soluta nihil vitae optio nostrum voluptatum alias corporis
        animi neque!
      </p>
      <span className="w-full block mt-8 border-b-1 border-gray-500"></span>
    </div>
  );
};

export default Reviews;
