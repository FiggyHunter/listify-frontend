import { AddReview } from "@/api/review";
import InputTheme from "@/themes/InputTheme";
import { Rating, TextField } from "@mui/material";
import { useState } from "react";

const ReviewPopup = ({ setIsWriteReviewOpen, companyId, userId, jwt }) => {
  const [popupData, setPopupData] = useState({
    userId: userId,
    companyId: companyId,
    rating: 3.5,
    text: "",
  });

  return (
    <div
      onClick={() => {
        setIsWriteReviewOpen(false);
      }}
      className="top-0 grid place-content-center h-screen w-screen bg-slate-300 bg-opacity-80 z-30 fixed  "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-h-96 min-w-96 bg-bkgContrast flex flex-col justify-between px-4 py-4 rounded-3xl gap-2"
      >
        <div className="flex cursor-default items-center justify-between w-full text-content   pt-4">
          <h3 className="text-2xl font-bold">WRITE A REVIEW</h3>
          <span
            onClick={() => setIsWriteReviewOpen(false)}
            className="text-lg cursor-pointer self-center font-bold block"
          >
            X
          </span>
        </div>
        <Rating
          className="self-center"
          name="half-rating"
          size="large"
          defaultValue={2.5}
          value={popupData.rating}
          onChange={(e) =>
            setPopupData((prevData) => {
              return {
                ...prevData,
                rating: e.target.value,
              };
            })
          }
          precision={0.5}
          sx={{
            fontSize: "3rem",
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
        <TextField
          id="outlined-basic"
          label="Review text"
          sx={InputTheme}
          variant="outlined"
          focused
          required
          multiline
          value={popupData.text}
          inputProps={{ style: { color: "var(--color-content)" } }} // Set the input text color directly
          onChange={(e) =>
            setPopupData((prevData) => {
              return {
                ...prevData,
                text: e.target.value,
              };
            })
          }
        />

        <button
          onClick={() => {
            AddReview(popupData, jwt);
          }}
        >
          PUBLISH{" "}
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
