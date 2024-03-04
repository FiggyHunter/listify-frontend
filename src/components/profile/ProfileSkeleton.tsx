const ProfileSkeleton = () => {
  return (
    <div className="mx-auto w-4/5">
      <section className="grid sm:grid-cols-1 md:custom-cols-company gap-4 h-min">
        <aside className="sm:block md:sticky top-24 bg-bkgContrast rounded-tl-2xl bg-transparent h-full pt-0">
          <div className="flex flex-col bg-bkgContrast shadow-md rounded-xl pt-5">
            <div className="sm:w-4/4 lg:w-3/4 rounded-xl h-16 lg:h-56 self-center bg-content font-black text-6xl grid place-content-center text-bkg"></div>

            <button
              disabled
              className="w-5/6 group mx-auto my-4 bg-transparent text-content border-darkBlue flex items-center gap-2 hover:bg-crimson transition-all duration-200 hover:text-white justify-center "
            >
              Edit your profile
              <svg
                className="fill-crimson group-hover:fill-white"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </div>
        </aside>
        <section className="md:pl-16 min-h-96 h-full bg-bkgContrast text-center rounded-tr-2xl flex flex-col py-6 mb-6 gap-3 sm:w-full md:w-auto lg:w-auto">
          <div>
            <h1 className="text-content font-inter text-2xl sm:text-center md:text-left lg:text-6xl mb-4 font-extrabold"></h1>
            <h2 className="text-content text-xl font-normal md:text-left sm:text-center">
              <div className="flex gap-2 lg:justify-normal items-center sm:justify-center">
                <svg
                  className="fill-content"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 256 256"
                ></svg>
              </div>
            </h2>
          </div>
          <p
            className={`text-content font-normal text-justify px-2 sm:w-full md:w-5/6`}
          ></p>
          <div className="flex text-black items-center pr-6">
            <span className="relative top-1 w-full h-1 border-gray-400 border-t-1"></span>
            <span className="relative top-1 w-full h-1 border-gray-400 border-t-1 "></span>
          </div>
          <article className="flex flex-col gap-2 sm:items-center md:items-baseline "></article>
          <article
            className={`flex flex-col gap-2 overflow-y-scroll custom-overflow`}
          >
            <h3 className="text-content sm:text-center lg:text-left text-2xl mb-4  text-left  inline-block px-1 font-semibold after:absolute after:-bottom-2  sm:after:left-1/2 lg:after:left-1 after:h-1 after:w-12 after:-translate-y-1 after:bg-gray-300 after:content-[''] sticky top-0 bg-bkgContrast bg-bkg z-20">
              User Reviews
            </h3>
          </article>
        </section>
      </section>
    </div>
  );
};

export default ProfileSkeleton;
