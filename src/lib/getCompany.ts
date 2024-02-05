import { hostName } from "./hostName";
import { Company } from "./types/company";

export const getCompany = async (userId: string): Promise<Company> => {
  const companyResponse = await fetch(`${hostName}/api/company/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const companyData = await companyResponse.json();
  const { company } = companyData;
  return company;
};
