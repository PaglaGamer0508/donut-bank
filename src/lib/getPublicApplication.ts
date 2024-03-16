import { hostName } from "./hostName";
import { ApplicationPublic } from "./types/application-public";

export const getPublicApplication = async (
  applicationId: string
): Promise<ApplicationPublic | null> => {
  const applicationResponse = await fetch(
    `${hostName}/api/application-public/${applicationId}?apiKey=${process.env.API_KEY}`,
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
