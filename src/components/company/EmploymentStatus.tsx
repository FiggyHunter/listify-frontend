import { JoinCompany, joinCompany, leaveCompany } from "@/api/user";
import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
const EmploymentStatus = ({
  jwt,
  companyId,
  userId,
  employees,
  fetchEmployees,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    function isUserIdInEmployeesList(userId: string) {
      for (let employee of employees) {
        if (employee._id === userId) {
          setIsChecked(true);
          return;
        }
      }
      setIsChecked(false);
    }
    isUserIdInEmployeesList(userId);
  }, []);

  return (
    <>
      <label className="text-content font-bold mr-2">
        I currently work here
      </label>
      <Switch
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          !isChecked
            ? joinCompany(jwt, userId, companyId, fetchEmployees)
            : leaveCompany(jwt, userId, fetchEmployees);
        }}
        aria-label="Change your status in company"
      />
    </>
  );
};

export default EmploymentStatus;
