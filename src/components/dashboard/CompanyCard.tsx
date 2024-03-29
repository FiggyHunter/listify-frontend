import React, { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
}

const CompanyCard: React.FC<Props> = ({ navigate, company }) => {
  const [imgColors, setImgColors] = useState();
  return (
    <article className="sm:flex sm:flex-col sm:text-center lg:text-left lg:grid border-b-2 rounded-xl bg-bkgContrast p-4 border-content custom-cols-dash gap-4 sm:w-full lg:w-full mx-auto text-content gradient-border-cards">
      <img
        alt={`logo for ${company.name}`}
        onClick={() => navigate(`/company/${company._id}`)}
        src={
          company.logo == null || company.logo === "/neki_logo.webp"
            ? "/logo.svg"
            : company.logo
        }
        className="sm:w-4/4 lg:w-3/4 rounded-xl h-24 lg:h-32 self-center bg-gray-300 cursor-pointer"
      ></img>
      <div className="flex flex-col items-center justify-between">
        <div className="w-full flex sm:flex-col md:flex-row justify-between  text-content">
          <p className="lg:mx-0 text-lg mb-2">
            <span className="font-black">HQ:</span> {company.hq.name}
          </p>
          <div className="flex gap-2 mb-2">
            {company && (
              <button
                aria-label={`This company is ${company?.group} `}
                className="py-1 px-2 text-bkg  bg-content text-sm sm:mx-auto lg:mx-0"
              >
                {company.group ? company.group : "HIRING"}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-content  w-full py-2  ">
          <h3
            onClick={() => navigate(`/company/${company._id}`)}
            className="sm:text-2xl text-4xl items-start cursor-pointer font-semibold"
          >
            {company.name}
          </h3>
          <p
            onClick={() => navigate(`/company/${company._id}`)}
            className="text-md sm:line-clamp-4 md:line-clamp-2 lg:line-clamp-2 cursor-pointer "
          >
            {company.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;
