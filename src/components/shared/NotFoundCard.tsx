const NotFoundCard = ({ text }) => {
  return (
    <div className="flex sm:flex-col sm:gap-2 lg:flex-col lg:gap-0 items-center">
      <img
        className="w-48"
        src="/search.svg"
        alt="cat holding a magnifying glass"
      ></img>
      <p className="text-content mt-2 sm:text-xl lg:text-3xl text-center w-full font-normal">
        {text}
      </p>
    </div>
  );
};

export default NotFoundCard;
