import { Company } from "@/lib/types/company";
import React from "react";

interface CompanyDashboardProps {
  company: Company;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({}) => {
  return <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
    <div></div>
  </div>;
};

export default CompanyDashboard;
