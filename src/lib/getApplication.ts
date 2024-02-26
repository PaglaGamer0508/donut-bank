import { hostName } from "./hostName";
import { Application } from "./types/application";

export const getApplication = async (
  applicationId: string
): Promise<Application | null> => {
  const applicationResponse = await fetch(
    `${hostName}/api/application/${applicationId}?apiKey=${process.env.API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (applicationResponse.status === 404) {
    return null;
  }

  const applicationData = await applicationResponse.json();

  const { application } = applicationData;
  return application;
};
