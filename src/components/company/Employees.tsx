import getInitials from "@/utilities/getInitialsFromName";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Employees = ({ employee }) => {
  const navigate = useNavigate();
  const date = new Date().toISOString();

  function getMonthDifference(joinedAt) {
    if (joinedAt === null) {
      return "Unknown";
    }

    const date = new Date(joinedAt);
    return moment(date, "YYYYMMDD").fromNow();
  }

  const monthDifference = getMonthDifference(employee.joinedAt);

  return (
    <div
      onClick={() => {
        navigate(`/profile/${employee._id}`);
      }}
      className="cursor-pointer text-content flex w-5/6 mx-auto gap-2 sm:justify-center md:justify-start my-4"
    >
      <div className="bg-gray-300 grid place-content-center font-bold self-center w-16 h-16 rounded-full ">
        {getInitials(`${employee.name} ${employee.surname}`)}{" "}
      </div>
      <div className="">
        <p className="font-extrabold">{`${employee.name} ${employee.surname}`}</p>{" "}
        <p>{`${monthDifference}`}</p>
      </div>
    </div>
  );
};

export default Employees;
