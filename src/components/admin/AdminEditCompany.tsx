import { getAllCountries } from "@/api/country";
import InputTheme from "@/themes/InputTheme";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FileUpload from "../shared/FileUpload";
import { updateCompany } from "@/api/company";

const AdminEditCompany = ({
  jwt,
  currentCompany,
  setIsEditCompany,
  setCompanies,
}) => {
  console.log(currentCompany);

  const [locations, setLocations] = useState([]);
  const [companyImage, setCompanyImage] = useState([]);

  const [company, setCompany] = useState({
    name: "",
    description: "",
    logo: null,
    websiteURL: "",
    linkedinURL: "",
    hq: null,
    countries: [],
    categories: [],
    group: "",
  });

  const handleCompanyEdit = async (company) => {
    const receivedCompany = { ...company };

    if (receivedCompany.name === currentCompany.name)
      delete receivedCompany.name;
    if (receivedCompany.description === currentCompany.description)
      delete receivedCompany.description;
    if (receivedCompany.logo === currentCompany.logo)
      delete receivedCompany.logo;
    if (receivedCompany.websiteURL === currentCompany.websiteURL)
      delete receivedCompany.websiteURL;
    if (receivedCompany.linkedinURL === currentCompany.linkedinURL)
      delete receivedCompany.linkedinURL;
    if (receivedCompany.hq === currentCompany.hq) delete receivedCompany.hq;
    if (
      JSON.stringify(receivedCompany.countries) ===
      JSON.stringify(currentCompany.countries)
    )
      delete receivedCompany.countries;
    if (
      JSON.stringify(receivedCompany.categories) ===
      JSON.stringify(currentCompany.categories)
    )
      delete receivedCompany.categories;
    if (receivedCompany.group === currentCompany.group)
      delete receivedCompany.group;

    receivedCompany.id = receivedCompany._id;
    delete receivedCompany._id;
    delete receivedCompany.createdAt;
    delete receivedCompany.__v;

    if (receivedCompany.hq) {
      delete receivedCompany.hq.name;
      let id = receivedCompany.hq._id;
      receivedCompany.hq = id;
    }

    console.log(receivedCompany);
    await updateCompany(jwt, receivedCompany, setCompanies);
  };

  console.log(company);
  console.log(locations);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllCountries(jwt, setLocations);
  }, [jwt]);

  useEffect(() => {
    setCompany(currentCompany);
  }, []);

  return (
    <div
      onClick={() => {
        setIsEditCompany(false);
      }}
      className={`z-50 h-full w-full fixed top-0 bg-black bg-opacity-80 grid place-items-center sm:overflow-auto lg:overflow-auto`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sm:w-5/6 lg:w-1/3 h-fit bg-bkgContrast grid grid-cols-2 custom-rows px-8 gap-5 rounded-2xl"
      >
        {" "}
        <div className="w-full mx-auto flex items-center justify-between mt-4 border-b-1 pb-2 border-content col-span-2 font-bold text-content">
          <p
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-xl"
          >
            EDIT AN EXISTING COMPANY
          </p>
          <button
            onClick={() => {
              setIsEditCompany(false);
            }}
            className="text-bkg bg-content"
          >
            X
          </button>
        </div>{" "}
        <TextField
          className="col-span-2"
          type="text"
          label="Company Name"
          name="name"
          variant="outlined"
          value={company?.name}
          onChange={handleChange}
          // error={errors?.companyName ? true : false}
          // helperText={errors?.companyName}
          sx={InputTheme}
        />{" "}
        <TextField
          className="col-span-2"
          type="text"
          label="Company Description"
          name="description"
          variant="outlined"
          sx={InputTheme}
          value={company.description}
          onChange={handleChange}
          // error={errors?.companyDescription ? true : false}
          // helperText={errors?.companyDescription}
        />{" "}
        <Autocomplete
          className="col-span-2"
          freeSolo
          id="free-solo-demo"
          sx={InputTheme}
          value={currentCompany.hq}
          getOptionLabel={(option) =>
            option.country ? option?.country : option?.name
          }
          options={locations.map((option) => option)}
          onChange={(_, selectedOption) => {
            setCompany((prevValue) => ({
              ...prevValue,
              hq: {
                _id: selectedOption?.id,
                name: selectedOption?.country,
              },
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company HQ"
              // error={errors?.companyHQ ? true : false}
              // helperText={errors?.companyHQ}
            />
          )}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          sx={InputTheme}
          value={company.countries}
          defaultValue={company.countries}
          options={locations.map((option) => option)}
          onChange={(_, selectedOption) => {
            const countries = selectedOption.map((country) => {
              console.log(country);
              return {
                _id: country._id ? country._id : country.id,
                name: country.country ? country.country : country.name,
              };
            });

            setCompany((prevValue) => ({
              ...prevValue,
              countries: countries,
            }));
          }}
          getOptionLabel={(option) =>
            option.name ? option.name : option.country
          }
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              fullWidth
              sx={InputTheme}
              {...params}
              label="Location"
              placeholder="Start typing a location"
              // error={errors?.location ? true : false}
              // helperText={errors?.location}
            />
          )}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          sx={InputTheme}
          options={[
            "Software Development",
            "Product Development",
            "Web Development",
            "E-commerce",
          ]}
          // onChange={(_, selectedOptions) => {
          //   setCompanyData((prevValue) => ({
          //     ...prevValue,
          //     areasOfExperise: selectedOptions,
          //   }));
          // }}
          // getOptionLabel={(option) => option}
          // defaultValue={companyData.areasOfExperise}
          // value={companyData.areasOfExperise}
          // filterSelectedOptions
          renderInput={(params) => (
            <TextField
              // {...params}
              // sx={InputTheme}
              fullWidth
              label="Areas of expertise"
              placeholder="Start typing an expertise"
              // error={errors?.areasOfExperise ? true : false}
              // helperText={errors?.areasOfExperise}
            />
          )}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="LinkedIn URL"
          name="linkedinURL"
          variant="outlined"
          sx={InputTheme}
          value={company.linkedinURL}
          onChange={handleChange}
          // error={errors?.linkedinUrl ? true : false}
          // helperText={errors?.linkedinUrl}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="Website URL"
          name="websiteURL"
          variant="outlined"
          sx={InputTheme}
          value={company.websiteURL}
          onChange={handleChange}
          // error={errors?.websiteUrl ? true : false}
          // helperText={errors?.websiteUrl}
        />
        <FileUpload setCompanyImage={setCompanyImage} />
        <Autocomplete
          className="col-span-2"
          freeSolo
          sx={InputTheme}
          id="tags-outlined"
          options={["HIRING", "INTERVIEW", "MAN IN THE MIDDLE", "PARTNER"]}
          onChange={(_, selectedOption) => {
            setCompany((prevValue) => ({
              ...prevValue,
              group: selectedOption,
            }));
          }}
          value={company?.group}
          defaultValue={company?.group}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              placeholder="Start typing a location"
              // error={errors?.category ? true : false}
              // helperText={errors?.category}
            />
          )}
        />{" "}
        <button
          onClick={() => handleCompanyEdit(company)}
          className="mx-auto w-full col-span-2 mb-8  my-auto bg-crimson hover:bg-crimsonHover text-black transition-all duration-200"
        >
          EDIT THE COMPANY
        </button>
      </div>
    </div>
  );
};

export default AdminEditCompany;
