import { hostName } from "./hostName";
import { Application } from "./types/application";

export const getAllApplications = async (
  userId: string
): Promise<Application[]> => {
  const applicationResponse = await fetch(
    `${hostName}/api/application?apiKey=${process.env.API_KEY}&userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const applicationData = await applicationResponse.json();
  const { applications } = applicationData;
  return applications;
};
