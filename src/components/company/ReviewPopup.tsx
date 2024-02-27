import { AddReview } from "@/api/review";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import InputTheme from "@/themes/InputTheme";
import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import LoaderButton from "../shared/LoaderButton";

const ReviewPopup = ({
  setIsWriteReviewOpen,
  companyId,
  userId,
  jwt,
  setReviews,
}) => {
  const [popupData, setPopupData] = useState({
    userId: userId,
    companyId: companyId,
    rating: 3.5,
    text: "",
  });
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`addReviewBtn`] || false;
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") setIsWriteReviewOpen(false);
    };

    window.addEventListener("keydown", escListener);

    return () => {
      window.removeEventListener("keydown", escListener);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setIsWriteReviewOpen(false);
      }}
      className="top-0 grid place-content-center h-screen w-screen bg-black bg-opacity-50 z-30 fixed  "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-h-96 min-w-96 bg-bkgContrast flex flex-col justify-between px-4 py-4 rounded-3xl gap-2"
      >
        <div className="flex cursor-default items-center justify-between w-full text-content   pt-4">
          <h3 className="text-xl font-bold">WRITE A REVIEW</h3>
          <span
            onClick={() => setIsWriteReviewOpen(false)}
            className="text-lg cursor-pointer self-center font-bold block"
          >
            <button className="bg-content text-bkg"> X </button>
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
          className="bg-content text-bkg"
          onClick={() => {
            AddReview(
              popupData,
              jwt,
              setReviews,
              "addReviewBtn",
              setButtonLoading
            );
          }}
        >
          {isLoading ? <LoaderButton /> : "PUBLISH"}
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
