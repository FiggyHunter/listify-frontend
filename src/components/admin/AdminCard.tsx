import { changeAdmitted, disbandUser } from "@/api/user";
import AdminButton from "../shared/AdminButtons";
import getInitials from "@/utilities/getInitialsFromName";
import DisbandButton from "./DisbandButton";
import BanButton from "./BanButton";
import PromoteToAdmin from "./PromoteToAdmin";

const AdminCard = ({ jwt, user, handleAdmitUser, fetchUsers, type }) => {
  console.log(jwt);
  return (
    <section className="grid w-full px-8 mx-auto access-grid gap-4 ">
      <div className="h-16  sm:col-span-2 lg:col-span-1  sm:self-center w-16 bg-sky-400 grid place-content-center text-black font-black text-xl ">
        {" "}
        {getInitials(`${user.name} ${user.surname}`)}
      </div>
      <div className="flex sm:col-span-2 lg:col-span-1 flex-col gap-3 w-full text-content">
        <h2 className="text-xl font-bold">{`${user.name} ${user.surname}`}</h2>
        <h3 className="text-base font-light">Email: {user.email}</h3>
        <h4 className="text-base font-light">Date: {user.createdAt}</h4>
      </div>
      <div className="flex items-center gap-4">
        {type === "list" ? (
          <DisbandButton jwt={jwt} userId={user._id} fetchUsers={fetchUsers} />
        ) : (
          <BanButton jwt={jwt} user={user} fetchUsers={fetchUsers} />
        )}
      </div>{" "}
      <div className="flex items-center gap-4">
        {type === "list" ? (
          <AdminButton
            buttonId={`btn${user._id}`}
            jwt={jwt}
            text={"ADMIT"}
            userId={user._id}
            handleAdmitUser={handleAdmitUser}
            fullName={`${user.name} ${user.surname}`}
          />
        ) : (
          <PromoteToAdmin />
        )}
      </div>
    </section>
  );
};

export default AdminCard;
