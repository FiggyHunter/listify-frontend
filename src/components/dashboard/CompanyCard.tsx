import React, { useEffect, useState } from "react";

const CompanyCard = () => {
  const [imgColors, setImgColors] = useState();

  useEffect(() => {
    console.log(imgColors);
  }, imgColors);
  return (
    <article className="grid custom-cols-dash gap-4 w-5/6 mx-auto text-content ">
      <img
        src={
          "https://www.google.com/s2/favicons?domain=www.ministryofprogramming.com"
        }
        className="sm:w-4/4 lg:w-3/4 rounded-xl h-16 lg:h-32 self-center bg-gray-300"
      ></img>
      <div className="flex flex-col items-center justify-between">
        <div className="w-full flex sm:flex-col md:flex-row justify-between  text-content">
          <p className="font-inter text-lg mb-2">
            <span className="font-black">HQ:</span> Sarajevo
          </p>
          <div className="flex gap-2 mb-2">
            <button className="py-1 px-2 text-bkg  bg-content text-sm">
              PARTNER
            </button>
            <button className="py-1 px-2 text-bkg  bg-content text-sm">
              PARTNER
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-content  w-full py-2  ">
          <h3 className="text-2xl items-start">Ministarstvo Programiranja</h3>
          <p className="text-md sm:hidden md:block lg:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            repudiandae sed a accusamus temporibus qui totam veritatis nemo
            ipsam ratione.
          </p>
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;
