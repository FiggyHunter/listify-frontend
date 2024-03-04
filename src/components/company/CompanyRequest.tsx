import { AddRequest, addRequest } from "@/api/request";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import InputTheme from "@/themes/InputTheme";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import LoaderButton from "../shared/LoaderButton";

const CompanyRequest = ({ jwt, userId, companyId, setIsAddRequestOpen }) => {
  const [changeText, setChangeText] = useState("");
  const [requestError, setRequestErrors] = useState("");
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`requestLoader`] || false;
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") setIsAddRequestOpen(false);
    };

    window.addEventListener("keydown", escListener);

    return () => {
      window.removeEventListener("keydown", escListener);
    };
  }, []);
  return (
    <section
      onClick={(e) => {
        setIsAddRequestOpen(false);
      }}
      className="h-screen w-screen grid fixed bg-black z-40 bg-opacity-40 top-0 place-content-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-96 min-h-96 bg-bkgContrast grid items-start text-white rounded-xl "
      >
        <div className="flex items-center justify-between w-5/6 mx-auto mt-4">
          <div className="text-content font-bold">REQUEST A CHANGE</div>
          <button
            onClick={(e) => {
              setIsAddRequestOpen(false);
            }}
            className="bg-content text-bkg"
          >
            X
          </button>
        </div>{" "}
        <div className="w-5/6 mx-auto my-4  grid">
          <TextField
            id="outlined-basic"
            label="Describe the change"
            sx={InputTheme}
            variant="outlined"
            focused
            required
            multiline
            value={changeText}
            error={requestError !== ""}
            helperText={requestError !== "" ? requestError : ""}
            inputProps={{
              style: {
                minHeight: "5rem",
                color: "var(--color-content)",
                resize: "both",
              },
            }}
            onChange={(e) => setChangeText(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            addRequest(
              jwt,
              companyId,
              userId,
              changeText,
              setRequestErrors,
              "requestLoader",
              setButtonLoading
            )
          }
          className="w-5/6 mx-auto p-4 bg-content text-bkgContrast font-bold"
        >
          {isLoading ? <LoaderButton /> : "MAKE A REQUEST"}
        </button>
      </div>
    </section>
  );
};

export default CompanyRequest;
