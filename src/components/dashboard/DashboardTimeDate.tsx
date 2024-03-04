import moment from "moment";
import { useEffect, useState } from "react";

const DashboardTimeDate = ({ token }) => {
  const [currentTime, setCurrentTime] = useState(moment().format("LTS"));

  const currentDay = getCurrentDay();
  function getCurrentDay() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();

    return daysOfWeek[dayIndex];
  }

  useEffect(() => {
    const secondUpdater = setTimeout(() => {
      setCurrentTime(moment().format("LTS"));
    }, 1000);

    return () => {
      clearTimeout(secondUpdater);
    };
  });

  return (
    <>
      <h1 className="cursor-default sm:text-center sm:text-3xl md:text-5xl md:text-right font-bold text-white ">
        Good afternoon {token.decodedToken ? token.decodedToken.name : ""}.
      </h1>
      <h2 className="cursor-default sm:text-center md:text-right text-content text-white">
        It's {currentTime} on a {currentDay}
      </h2>{" "}
    </>
  );
};

export default DashboardTimeDate;
