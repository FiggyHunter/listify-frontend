import { getAllCountries } from "@/api/country";
import InputTheme from "@/themes/InputTheme";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FileUpload from "../shared/FileUpload";
import {
  addCompanyImage,
  notifyUpdatedCompany,
  updateCompany,
} from "@/api/company";
import LoaderButton from "../shared/LoaderButton";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import { getAllCategories } from "@/api/category";
import editCompanySchema from "@/schemas/editCompanySchema";

const AdminEditCompany = ({
  jwt,
  currentCompany,
  setIsEditCompany,
  setCompanies,
}) => {
  const [locations, setLocations] = useState([]);
  const [companyImage, setCompanyImage] = useState(null);

  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`editCompanyButton`] || false;
  const [uploadErrors, setUploadErrors] = useState(null);
  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState();

  console.log(errors);

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
    try {
      setErrors(null);
      const receivedCompany = { ...company, hq: { ...company.hq } };
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

      console.log(company);

      await editCompanySchema.validate(company, { abortEarly: false });
      await updateCompany(
        jwt,
        receivedCompany,
        setCompanies,
        setButtonLoading,
        "editCompanyButton"
      );
      if (companyImage) {
        await addCompanyImage(
          jwt,
          receivedCompany.id,
          companyImage,
          setCompanies,
          setButtonLoading,
          "editCompanyButton",
          setUploadErrors
        );
      }
      notifyUpdatedCompany();
      setErrors(null);
    } catch (error) {
      const validationErrors = {};
      error?.inner?.forEach((err) => {
        console.log(err.path);
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllCategories(jwt, setCategories);
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
          error={errors?.name ? true : false}
          helperText={errors?.name}
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
          error={errors?.description ? true : false}
          helperText={errors?.description}
        />{" "}
        <Autocomplete
          className="col-span-2"
          freeSolo
          name="hq"
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
              error={errors && errors["hq.name"] ? true : false}
              helperText={errors && errors["hq.name"]}
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
              error={errors?.countries ? true : false}
              helperText={errors?.countries}
            />
          )}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          sx={InputTheme}
          options={categories.map((option) => option)}
          onChange={(_, selectedOptions) => {
            setCompany((prevValue) => ({
              ...prevValue,
              categories: selectedOptions,
            }));
          }}
          getOptionLabel={(option) => option.name}
          defaultValue={company.categories}
          value={company.categories}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              sx={InputTheme}
              fullWidth
              label="Areas of expertise"
              placeholder="Start typing an expertise"
              error={errors?.categories ? true : false}
              helperText={errors?.categories}
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
          error={errors?.linkedinURL ? true : false}
          helperText={errors?.linkedinURL}
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
          error={errors?.websiteURL ? true : false}
          helperText={errors?.websiteURL}
        />{" "}
        <div className="flex col-span-2 items-center  justify-between">
          <h4
            className={`${
              uploadErrors ? "text-red-600 font-bold" : "text-content"
            } text-content w-full text-sm`}
          >
            {uploadErrors
              ? uploadErrors
              : "Upload new image to change the current one"}
          </h4>
          <FileUpload setCompanyImage={setCompanyImage} />
        </div>
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
              error={errors?.group ? true : false}
              helperText={errors?.group}
            />
          )}
        />{" "}
        <button
          onClick={() => handleCompanyEdit(company)}
          className="mx-auto w-full col-span-2 mb-8  my-auto bg-crimson hover:bg-crimsonHover text-black transition-all duration-200"
        >
          {isLoading ? <LoaderButton /> : "EDIT THE COMPANY"}
        </button>
      </div>
    </div>
  );
};

export default AdminEditCompany;
