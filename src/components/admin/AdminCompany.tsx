const AdminCompany = ({ company }) => {
  console.log(company);
  return (
    <section className="grid w-full px-8 mx-auto access-grid gap-4 ">
      <div className="h-16  sm:col-span-2 lg:col-span-1  sm:self-center w-16 bg-sky-400 "></div>
      <div className="flex sm:col-span-2 lg:col-span-1 flex-col gap-3 w-full text-content">
        <h2 className="text-xl font-bold">{`${company.name}`}</h2>
        <h3 className="text-base font-light">Email: {company?.email}</h3>
        <h4 className="text-base font-light">Date: {company?.createdAt}</h4>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-darkBlue">Disband</button>
      </div>{" "}
      <div className="flex items-center gap-4">
        <button className="bg-crimson">Admit</button>
      </div>{" "}
    </section>
  );
};

export default AdminCompany;
