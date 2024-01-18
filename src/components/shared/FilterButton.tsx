const FilterButton = ({ text, isSelected, handleFilter }) => {
  return (
    <button
      onClick={() => handleFilter(text)}
      className={`focus:outline-none mx-auto w-5/6  border-content border-2   transition-all duration-200 ${
        isSelected
          ? "bg-darkBlue border-red-600 text-white"
          : " bg-transparent text-content"
      }`}
    >
      {text}
    </button>
  );
};

export default FilterButton;
