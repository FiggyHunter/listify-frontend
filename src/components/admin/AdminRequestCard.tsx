import { getCompanyById } from "@/api/company";
import { deleteRequest } from "@/api/request";
import { getUserById } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import getInitials from "@/utilities/getInitialsFromName";
import { useEffect, useState } from "react";
import LoaderButton from "../shared/LoaderButton";

const AdminRequestCard = ({ request, jwt, setRequests }) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`btn-demote${request._id}`] || false;
  const [user, setUser] = useState();
  const [company, setCompany] = useState();

  useEffect(() => {
    getUserById(request.userId, jwt).then((user) => setUser(user));
    getCompanyById(jwt, setCompany, request.companyId);
  }, []);

  return (
    <article className=" gap-2 w-full mx-auto text-content ">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 text-bkg font-black bg-blue-400 grid place-content-center">
          {getInitials(`${user?.name} ${user?.surname}`)}
        </div>
        <div className="">
          <h2 className="text-xl font-bold">
            {`${user?.name ? user.name : "Loading"} ${
              user?.surname ? user.surname : "user..."
            } @ ${company?.name}`}{" "}
          </h2>
        </div>
      </div>
      <p className="text-content mt-4">{request?.text}</p>
      <button
        onClick={() => {
          deleteRequest(
            jwt,
            request._id,
            setRequests,
            `btn-demote${request._id}`,
            setButtonLoading
          );
        }}
        className="mt-4 bg-crimson transition-all duration-150 hover:bg-crimsonHover  font-bold"
      >
        {isLoading ? <LoaderButton /> : `MARK AS COMPLETED`}
      </button>
    </article>
  );
};

export default AdminRequestCard;
