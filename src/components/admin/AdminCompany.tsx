import { deleteCompany } from "@/api/company";
import AddCompanyPopup from "../dashboard/AddCompanyPopup";

const AdminCompany = ({
  jwt,
  company,
  setCompanies,
  setIsCompanyOpen,
  setCurrentCompany,
}) => {
  console.log(company);
  return (
    <section className="grid w-full px-8 mx-auto access-grid gap-4 ">
      <div className="h-16  sm:col-span-2 lg:col-span-1  sm:self-center w-16 bg-sky-400 ">
        <img src={company.logo} alt={`${company?.name} logo`} />
      </div>
      <div className="flex sm:col-span-2 lg:col-span-1 flex-col gap-3 w-full text-content">
        <h2 className="text-xl font-bold">{`${company.name}`}</h2>{" "}
        <h4 className="text-base font-light">
          Status:{" "}
          <span className="font-bold">
            {company?.group ? company.group : "NO STATUS"}
          </span>
        </h4>
        <h4 className="text-base font-light">
          Date Added: {company?.createdAt}
        </h4>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setCurrentCompany(company);
            setIsCompanyOpen(true);
          }}
          className="bg-darkBlue w-fit"
        >
          Edit
        </button>
      </div>{" "}
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            deleteCompany(company._id, company.name, jwt, setCompanies)
          }
          className="bg-crimson"
        >
          Delete
        </button>
      </div>{" "}
    </section>
  );
};

export default AdminCompany;
