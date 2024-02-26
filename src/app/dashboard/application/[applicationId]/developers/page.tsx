import CreateAPIKeyButton from "@/components/CreateAPIKeyButton";
import DeleteAPIKeyButton from "@/components/DeleteAPIKeyButton";
import { getAuthSession } from "@/lib/auth";
import { getAPIKey } from "@/lib/getAPIKey";
import { getApplication } from "@/lib/getApplication";
import { hasAPIKey } from "@/lib/hasAPIKey";
import React from "react";

interface pageProps {
  params: {
    applicationId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { applicationId } = params;

  const session = await getAuthSession();
  const application = await getApplication(applicationId);

  if (!application) {
    return <div>Application not found</div>;
  }

  if (application?.ownerId !== session?.user?.id) {
    return <div>You are not the owner of this application</div>;
  }

  const apiKey = await getAPIKey(application?.id!);

  if (!apiKey) {
    return (
      <div>
        <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
          <div>
            <h1>No API Key Found</h1>
            <CreateAPIKeyButton applicationId={application.id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <div>
          <p className="">API Key: {apiKey.key}</p>
          <DeleteAPIKeyButton
            apiKeyId={apiKey.id}
            applicationId={application.id}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
