import useCompanyState from "@/hooks/useCompanyState";
import InputTheme from "@/themes/InputTheme";
import { Autocomplete, TextField } from "@mui/material";
import FileUpload from "../shared/FileUpload";
const AddCompanyPopup = ({ jwt, locations, setIsAddCompanyOpen }) => {
  const {
    companyData,
    handleChange,
    handleCompanyCreation,
    setCompanyData,
    errors,
    companyImage,
    setCompanyImage,
  } = useCompanyState();

  return (
    <div
      onClick={() => {
        setIsAddCompanyOpen(false);
      }}
      className={`z-50 h-full w-full fixed top-0 bg-black bg-opacity-80 grid place-items-center sm:overflow-auto lg:overflow-auto`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sm:w-5/6 lg:w-1/3 h-fit bg-bkgContrast grid grid-cols-2 custom-rows px-8 gap-5 rounded-2xl"
      >
        <div className="w-full mx-auto flex justify-between mt-4 border-b-1 pb-2 border-content col-span-2 font-bold text-content">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsAddCompanyOpen(true);
            }}
            className="text-xl"
          >
            ADD A NEW COMPANY
          </p>
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
          value={companyData.companyName}
          onChange={handleChange}
          error={errors?.companyName ? true : false}
          helperText={errors?.companyName}
          sx={InputTheme}
        />
        <TextField
          className="col-span-2"
          type="text"
          label="Company Description"
          name="companyDescription"
          variant="outlined"
          sx={InputTheme}
          value={companyData.companyDescription}
          onChange={handleChange}
          error={errors?.companyDescription ? true : false}
          helperText={errors?.companyDescription}
        />
        <Autocomplete
          className="col-span-2"
          freeSolo
          id="free-solo-demo"
          sx={InputTheme}
          value={""}
          defaultValue={""}
          getOptionLabel={(option) =>
            option.country ? option.country : option
          }
          options={locations.map((option) => option)}
          onChange={(_, selectedOption) => {
            setCompanyData((prevValue) => ({
              ...prevValue,
              companyHQ: selectedOption?.country,
              hqId: selectedOption?.id,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company HQ"
              error={errors?.companyHQ ? true : false}
              helperText={errors?.companyHQ}
            />
          )}
        />
        <Autocomplete
          className="col-span-2"
          multiple
          id="tags-outlined"
          sx={InputTheme}
          value={companyData.countries}
          defaultValue={companyData.countries}
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
              sx={InputTheme}
              {...params}
              label="Location"
              placeholder="Start typing a location"
              error={errors?.location ? true : false}
              helperText={errors?.location}
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
          onChange={(_, selectedOptions) => {
            setCompanyData((prevValue) => ({
              ...prevValue,
              areasOfExperise: selectedOptions,
            }));
          }}
          getOptionLabel={(option) => option}
          defaultValue={companyData.areasOfExperise}
          value={companyData.areasOfExperise}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              sx={InputTheme}
              label="Areas of expertise"
              placeholder="Start typing an expertise"
              error={errors?.areasOfExperise ? true : false}
              helperText={errors?.areasOfExperise}
            />
          )}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="LinkedIn URL"
          name="linkedinUrl"
          variant="outlined"
          sx={InputTheme}
          value={companyData.linkedinUrl}
          onChange={handleChange}
          error={errors?.linkedinUrl ? true : false}
          helperText={errors?.linkedinUrl}
        />
        <TextField
          className="sm:col-span-2 lg:col-span-1"
          type="url"
          label="Website URL"
          name="websiteUrl"
          variant="outlined"
          sx={InputTheme}
          value={companyData.websiteUrl}
          onChange={handleChange}
          error={errors?.websiteUrl ? true : false}
          helperText={errors?.websiteUrl}
        />
        <FileUpload setCompanyImage={setCompanyImage} />
        <Autocomplete
          className="col-span-2"
          freeSolo
          sx={InputTheme}
          id="tags-outlined"
          options={["HIRING", "INTERVIEW", "MAN IN THE MIDDLE", "PARTNER"]}
          onChange={(_, selectedOptions) => {
            console.log(selectedOptions);
            setCompanyData((prevValue) => ({
              ...prevValue,
              category: selectedOptions,
            }));
          }}
          value={companyData.category}
          defaultValue={companyData.category}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              placeholder="Start typing a location"
              error={errors?.category ? true : false}
              helperText={errors?.category}
            />
          )}
        />
        <button
          onClick={() => handleCompanyCreation()}
          className="mx-auto w-full col-span-2 mb-8  my-auto bg-crimson hover:bg-crimsonHover text-black transition-all duration-200"
        >
          ADD A COMPANY
        </button>
      </div>
    </div>
  );
};

export default AddCompanyPopup;
