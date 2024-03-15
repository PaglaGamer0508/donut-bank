import { hostName } from "./hostName";
import { ApplicationPublic } from "./types/application-public";

export const getAllPublicApplications = async (): Promise<
  ApplicationPublic[]
> => {
  const applicationsResponse = await fetch(`${hostName}/api/applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const applicationsData = await applicationsResponse.json();
  const { applications } = applicationsData;

  return applications;
};
