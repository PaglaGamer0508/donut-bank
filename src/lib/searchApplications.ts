// import { hostName } from "./hostName";
// import { ApplicationSearchResult } from "./types/application-public";

// export const searchApplications = async (
//   applicationSearchString: string
// ): Promise<ApplicationSearchResult[]> => {
//   const applicationsResponse = await fetch(
//     `${hostName}/api/application/searchMany?apiKey=${process.env.API_KEY}&searchString=${applicationSearchString}`
//   );

//   const applicationsData = await applicationsResponse.json();
//   const { applications } = applicationsData;
//   return applications;
// };
