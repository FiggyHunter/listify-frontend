import InputTheme from "@/themes/InputTheme";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CompanySearch from "../shared/CompanySearch";

const MobileCompanyFilters = ({ locations, setFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    locations: [],
  });
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category:
        selectedFilters?.category.length !== 0
          ? selectedFilters.category
          : null,
      location:
        selectedFilters?.locations.length !== 0
          ? selectedFilters.locations
          : null,
    }));
  }, [selectedFilters]);

  return (
    <>
      <CompanySearch />
      <Autocomplete
        className="my-2"
        id="tags-outlined"
        options={["HIRING", "INTERVIEW", "MITM", "PARTNER"]}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        value={selectedFilters.category ? selectedFilters.category : ""}
        sx={InputTheme}
        onChange={(_, selectedOption) => {
          setSelectedFilters((prevValue) => ({
            ...prevValue,
            category: selectedOption ? selectedOption : "",
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            placeholder="Start typing a location"
          />
        )}
      />
      <Autocomplete
        key={"id-2"}
        multiple
        id="tags-outlined"
        options={locations}
        sx={InputTheme}
        getOptionLabel={(option) => option.country}
        filterSelectedOptions
        value={locations.filter((location) =>
          selectedFilters.locations.includes(location.country)
        )}
        onChange={(_, selectedOptions) => {
          const selectedLocations = selectedOptions.map(
            (location) => location.country
          );

          setSelectedFilters((prevValue) => ({
            ...prevValue,
            locations: selectedLocations,
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Locations"
            placeholder="Start typing a location"
          />
        )}
      />
      <button
        onClick={() => {
          setFilters({ category: null, location: null });
          setSelectedFilters({ category: [], locations: [] });
        }}
        className="mx-auto w-full my-auto bg-crimson font-bold hover:bg-crimsonHover transition-all duration-200 mb-4"
      >
        CLEAR FILTERS
      </button>
    </>
  );
};

export default MobileCompanyFilters;
