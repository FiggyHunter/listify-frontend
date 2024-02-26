import { getCompanyById } from "@/api/company";
import { deleteRequest } from "@/api/request";
import { getUserById } from "@/api/user";
import getInitials from "@/utilities/getInitialsFromName";
import { useEffect, useState } from "react";

const AdminRequestCard = ({ request, jwt, setRequests }) => {
  const [user, setUser] = useState();
  const [company, setCompany] = useState();

  useEffect(() => {
    getUserById(request.userId, jwt).then((user) => setUser(user));
    getCompanyById(jwt, setCompany, request.companyId);
  }, []);

  console.log(company);

  return (
    <article className=" gap-2 w-full mx-auto text-content ">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 text-bkg font-black bg-blue-400 grid place-content-center">
          {getInitials(`${user?.name} ${user?.surname}`)}
        </div>
        <div className="">
          <h2 className="text-xl font-bold">
            {`${user?.name} ${user?.surname} @ ${company?.name}`}{" "}
          </h2>
        </div>
      </div>
      <p className="text-content mt-4">{request?.text}</p>
      <button
        onClick={() => {
          deleteRequest(jwt, request._id, setRequests);
        }}
        className="mt-4 bg-crimson transition-all duration-150 hover:bg-crimsonHover  font-bold"
      >
        MARK AS COMPLETED
      </button>
    </article>
  );
};

export default AdminRequestCard;
