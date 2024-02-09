import { getAuthSession } from "@/lib/auth";
import { getApplication } from "@/lib/getApplication";
import { hasAPIKey } from "@/lib/hasAPIKey";
import React from "react";

interface pageProps {
  params: {
    applicationId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();
  const application = await getApplication(session?.user?.id!);
  const apiKeyExist = await hasAPIKey(application?.id!);

  console.log(params.applicationId);

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
        {apiKeyExist ? (
          <></>
        ) : (
          <div>
            <h1>No API Key Found</h1>
            <h1>Create A API</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
