import { hostName } from "./hostName";
import { APIKey } from "./types/apiKey";

export const getAPIKey = async (
  applicationId: string
): Promise<APIKey | null> => {
  const apiKeyResponse = await fetch(
    `${hostName}/api/application/api-key?applicationId=${applicationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (apiKeyResponse.status === 404) {
    return null;
  }

  const apiKeyData = await apiKeyResponse.json();

  const { apiKey } = apiKeyData;

  return apiKey;
};
