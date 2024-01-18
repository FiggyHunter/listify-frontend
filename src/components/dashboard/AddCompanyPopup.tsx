import { CreateCompany } from "@/api/company";
import sxFormTheme from "@/themes/sxFormTheme";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
const AddCompanyPopup = ({ jwt, locations, setIsAddCompanyOpen }) => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyHQ: "",
    location: [""],
    areasOfExperise: ["Software Development"],
    category: ["HIRING"],
    linkedinUrl: "",
    websiteUrl: "",
    locationId: "",
    hqId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyCreation = async () => {
    await CreateCompany(companyData, jwt);
  };
  return (
    <div
      onClick={() => {
        setIsAddCompanyOpen(false);
      }}
      className={`z-20 h-full w-full fixed top-0 bg-black bg-opacity-80 grid place-items-center overflow-scroll`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sm:w-2/3 lg:w-1/3 h-fit bg-bkgContrast grid grid-cols-2 custom-rows px-8 gap-10 rounded-2xl"
      >
        <div className="w-full mx-auto flex justify-between mt-4 border-b-1 pb-2 border-content col-span-2 font-bold text-content">
          <p className="text-xl">ADD A NEW COMPANY</p>
          <svg
            className="fill-content cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            onClick={() => setIsAddCompanyOpen(false)}
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </div>{" "}
        <TextField
          className="col-span-2"
          type="text"
          label="Company Name"
          name="companyName"
          variant="outlined"
          sx={sxFormTheme}
          value={companyData.companyName}
          onChange={handleChange}
        />
        <TextField
          className="col-span-2"
          type="text"
          label="Company Description"
          name="companyDescription"
          variant="outlined"
          sx={sxFormTheme}
          value={companyData.companyDescription}
          onChange={handleChange}
        />
        <Autocomplete
          className="col-span-2"
          freeSolo
          id="free-solo-demo"
          getOptionLabel={(option) => (option.country ? option.country : "")}
          options={locations.map((option) => option)}
          onChange={(_, selectedOption) => {
            setCompanyData((prevValue) => {
              console.log(selectedOption);
              return {
                ...prevValue,
                companyHQ: selectedOption.country,
                hqId: selectedOption.id,
              };
            });
          }}
          value={companyData.companyHQ.country}
          renderInput={(params) => <TextField {...params} label="Company HQ" />}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          options={locations.map((option) => option)}
          onChange={(_, selectedOption) => {
            const countries = selectedOption.map((country) => country.country);
            const ids = selectedOption.map((country) => country.id);

            setCompanyData((prevValue) => ({
              ...prevValue,
              location: countries,
              locationId: ids,
            }));
          }}
          getOptionLabel={(option) => option.country}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              placeholder="Start typing an location"
            />
          )}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          options={[
            "Software Development",
            "Product Development",
            "Web Development",
            "E-commerce",
          ]}
          onChange={(_, selectedOptions) => {
            setCompanyData((prevValue) => ({
              ...prevValue,
              areasOfExperise: selectedOptions,
            }));
          }}
          getOptionLabel={(option) => option}
          defaultValue={companyData.areasOfExperise}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Areas of expertise"
              placeholder="Start typing an expertise"
            />
          )}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="LinkedIn URL"
          name="linkedinUrl"
          variant="outlined"
          sx={sxFormTheme}
          value={companyData.linkedinUrl}
          onChange={handleChange}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="Website URL"
          name="websiteUrl"
          variant="outlined"
          sx={sxFormTheme}
          value={companyData.websiteUrl}
          onChange={handleChange}
        />
        <Autocomplete
          className="col-span-2"
          freeSolo
          id="tags-outlined"
          options={["HIRING", "INTERVIEW", "MAN IN THE MIDDLE", "PARTNER"]}
          onChange={(_, selectedOptions) => {
            setCompanyData((prevValue) => ({
              ...prevValue,
              category: selectedOptions,
            }));
          }}
          defaultValue={companyData.category}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              placeholder="Start typing a location"
            />
          )}
        />
        <button
          onClick={() => handleCompanyCreation()}
          className="mx-auto w-full col-span-2 mb-8  my-auto bg-crimson hover:bg-crimsonHover transition-all duration-200"
        >
          ADD A COMPANY
        </button>{" "}
      </div>
    </div>
  );
};

export default AddCompanyPopup;
