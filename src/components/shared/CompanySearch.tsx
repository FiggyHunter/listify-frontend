import { useSearchStore } from "@/stores/useUserStore";

const CompanySearch = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const handleSearch = (userSearch) => {
    setSearchTerm(userSearch);
  };
  return (
    <div className="h-full md:ml-auto lg:ml-auto sm:w-full  md:w-1/3 lg:w-2/4  items-center md:mr-4 lg:mr-4 flex flex-row border-content border-1 rounded-2xl  overflow-hidden gap-1 focus-within:border-crimsonHover  transition-all duration-250 bg-bkgContrast">
      {searchTerm === "" ? (
        <svg
          className="fill-content ml-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      ) : (
        <svg
          onClick={() => setSearchTerm("")}
          className="fill-content ml-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
        >
          <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
      )}

      <input
        className="inline-block text-content w-full text-md placeholder:font-medium sm:placeholder:text-xsm placeholder:text-sm py-1.5 focus:outline-none bg-bkgContrast "
        placeholder="Search a company here..."
        type="text"
        value={searchTerm}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default CompanySearch;
