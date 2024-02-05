import CompanyDashboard from "@/components/CompanyDashboard";
import CreateCompanyForm from "@/components/CreateCompanyForm";
import { getAuthSession } from "@/lib/auth";
import { getCompany } from "@/lib/getCompany";
import { hasCompany } from "@/lib/hasCompany";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const companyExist = await hasCompany(session?.user?.id!);
  const company = await getCompany(session?.user?.id!);

  return (
    <div>
      {companyExist ? (
        <>
          <CompanyDashboard company={company} />
        </>
      ) : (
        <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
          <CreateCompanyForm user={session?.user!} />
        </div>
      )}
    </div>
  );
};

export default page;
