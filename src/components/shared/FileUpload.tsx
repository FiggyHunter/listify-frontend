import imageValidation from "@/utilities/validators/imageValidation";
import { useState } from "react";

export default function FileUpload({ setCompanyImage }) {
  const [imageError, setImageError] = useState("");
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    imageValidation(selectedFile, setCompanyImage, setImageError);
  };

  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="file_input"
      >
        Upload file
      </label>
      <input
        onChange={(e) => {
          handleImageChange(e);
        }}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
      {imageError !== "" && (
        <label className="col-span-2 block text-red-500 font-bold">
          Please upload image in the correct format
        </label>
      )}
    </div>
  );
}
