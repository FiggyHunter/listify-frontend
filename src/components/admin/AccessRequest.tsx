import { changeAdmitted } from "@/api/user";
import AdminButton from "../shared/AdminButtons";
import getInitials from "@/utilities/getInitialsFromName";

const AccessRequest = ({ jwt, user, handleAdmitUser }) => {
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
        <button className="bg-darkBlue w-fit">Disband</button>
      </div>{" "}
      <div className="flex items-center gap-4">
        <AdminButton
          buttonId={`btn${user._id}`}
          jwt={jwt}
          text={"ADMIT"}
          userId={user._id}
          handleAdmitUser={handleAdmitUser}
          fullName={`${user.name} ${user.surname}`}
        />
      </div>{" "}
    </section>
  );
};

export default AccessRequest;
