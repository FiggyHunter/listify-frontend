const NotFoundCard = ({ text }) => {
  return (
    <div className="flex sm:flex-col sm:gap-2 lg:flex-col lg:gap-0 items-center">
      <img className="w-48" src="/cat_search.webp"></img>
      <p className="text-content mt-2 text-4xl text-center w-full font-medium">
        {text}
      </p>
    </div>
  );
};

export default NotFoundCard;
