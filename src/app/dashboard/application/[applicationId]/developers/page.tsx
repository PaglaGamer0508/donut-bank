import CreateAPIKeyButton from "@/components/CreateAPIKeyButton";
import DeleteAPIKeyButton from "@/components/DeleteAPIKeyButton";
import ShowAPIKey from "@/components/ShowAPIKey";
import WebsiteURL from "@/components/WebsiteURL";
import { getAuthSession } from "@/lib/auth";
import { getAPIKey } from "@/lib/getAPIKey";
import { getApplication } from "@/lib/getApplication";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

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

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <Image
          alt="Logo"
          src={application.logo}
          width={256}
          height={256}
          className="w-16 h-16 mx-auto"
        />
        <h1
          className={`${lato.className} text-green-500 text-2xl text-center mb-6`}
        >
          Developers Options
        </h1>
        <div>
          <WebsiteURL
            application_id={application.id}
            websiteURL={application.websiteUrl || null}
          />
        </div>
        {apiKey ? (
          <div className="mt-6">
            <p className="text-center text-red-500 font-semibold">
              Do not share this key with anyone
            </p>
            <ShowAPIKey apiKey={apiKey.key} />
            <div className="mt-2">
              <DeleteAPIKeyButton
                apiKeyId={apiKey.id}
                applicationId={application.id}
              />
              <p className="text-red-500 font-semibold">
                Delete this key first to create a new one
              </p>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center mt-6">
            <h1 className="text-2xl text-red-500 font-semibold mb-2">
              No API Key Found
            </h1>
            <CreateAPIKeyButton applicationId={application.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
