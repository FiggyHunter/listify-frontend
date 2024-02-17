const ReviewSkeleton = ({ navigate }) => {
  return (
    <>
      <div className="text-content text-left p-4">
        <div className="flex gap-2 sm:justify-center lg:justify-stretch">
          <div className="bg-gray-300 self-center w-12 h-12 rounded-full animate-pulse"></div>
          <div className="flex gap-1 flex-col">
            <div className="self-center bg-gray-300 w-20 h-6 rounded-md animate-pulse"></div>
            <div className="flex items-center">
              <div className="self-center bg-gray-300 w-20 h-6 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <p className="w-5/6 sm:mx-auto lg:mx-0 mt-2 pl-1 sm:text-center lg:text-left animate-pulse">
          <div className="self-center bg-gray-300 w-20 h-6 rounded-md animate-pulse"></div>
        </p>
        <div className="mt-4">
          <p
            className={`${navigate ? "" : "block"} pl-1.5 inline animate-pulse`}
          >
            Reviewed company:
          </p>

          <span className="inline-block ml-1 cursor-pointer text-content hover:text-accent-2 animate-pulse">
            <div className="self-center mt-2 bg-gray-300 w-20 h-6 rounded-md animate-pulse"></div>
          </span>
        </div>
        <span className="w-full block mt-8 border-b-1 border-gray-500 animate-pulse"></span>
      </div>
    </>
  );
};

export default ReviewSkeleton;
