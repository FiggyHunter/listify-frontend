import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FilterButtons from "../shared/FilterButton";

const CompanyFilters = ({ setFilters, locations }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: { HIRING: false, INTERVIEW: false, MITM: false, PARTNER: false },
    locations: [],
  });
  const handleFilter = (name) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      category: Object.fromEntries(
        Object.entries(prevFilters.category).map(([key, value]) => [
          key,
          key === name ? !value : false,
        ])
      ),
    }));
  };

  useEffect(() => {
    const activeCategory = Object.keys(selectedFilters.category).find(
      (category) => selectedFilters.category[category]
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: activeCategory,
      location:
        selectedFilters.locations.length === 0
          ? null
          : selectedFilters.locations,
    }));
  }, [selectedFilters]);

  return (
    <aside className="min-h-96 h-fit bg-bkgContrast rounded-2xl flex flex-col gap-2 pt-2 sm:hidden md:flex lg:flex">
      {" "}
      <FilterButtons
        isSelected={selectedFilters.category.HIRING}
        handleFilter={handleFilter}
        text={"HIRING"}
      />
      <FilterButtons
        isSelected={selectedFilters.category.INTERVIEW}
        text={"INTERVIEW"}
        handleFilter={handleFilter}
      />
      <FilterButtons
        isSelected={selectedFilters.category.MITM}
        text={"MITM"}
        handleFilter={handleFilter}
      />
      <FilterButtons
        isSelected={selectedFilters.category.PARTNER}
        text={"PARTNER"}
        handleFilter={handleFilter}
      />
      <div className="mx-auto mt-4 w-5/6  text-bkg">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={locations}
          getOptionLabel={(option) => option.country}
          filterSelectedOptions
          onChange={(_, selectedOptions) => {
            const selectedLocations = selectedOptions.map(
              (location) => location.country
            );

            setSelectedFilters((prevValue) => ({
              ...prevValue,
              locations: selectedLocations,
            }));
          }}
          value={locations.filter((location) =>
            selectedFilters.locations.includes(location.country)
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Locations"
              placeholder="Start typing a location"
            />
          )}
        />
      </div>
      <button
        onClick={() => {
          setSelectedFilters({
            category: {
              HIRING: false,
              INTERVIEW: false,
              MITM: false,
              PARTNER: false,
            },
            locations: [],
          });
          setFilters({ category: null, location: null });
        }}
        className="mx-auto w-5/6 my-auto bg-darkBlue hover:bg-crimsonHover transition-all duration-200"
      >
        CLEAR FILTERS
      </button>{" "}
    </aside>
  );
};

export default CompanyFilters;
