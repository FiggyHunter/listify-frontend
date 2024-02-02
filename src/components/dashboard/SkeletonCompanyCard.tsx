import React from "react";

const SkeletonCompanyCard = () => {
  return (
    <div className="w-5/6 mx-auto">
      <div
        role="status"
        className="grid custom-cols-dash gap-4 w-full mx-auto text-bkg animate-pulse  "
      >
        <div className="sm:w-4/4 lg:w-3/4 rounded-xl h-16 lg:h-32 self-center bg-gray-300"></div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full flex sm:flex-col md:flex-row justify-between text-black">
            <p className="font-inter text-lg mb-2">
              <span className="font-black text-content">HQ:</span>
            </p>
            <div className="flex gap-2 mb-2">
              <div className="py-1 px-2 text-bkgContrast text-sm lg:w-20 sm:w-16 h-8 sm:h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="py-1 px-2 text-bkgContrast text-sm lg:w-20 sm:w-16 h-8 sm:h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-black w-full py-2 ">
            <div className="text-2xl items-start h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            <div className="text-md sm:hidden md:block lg:block h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>{" "}
            <div className="text-md sm:hidden md:block lg:block h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCompanyCard;
