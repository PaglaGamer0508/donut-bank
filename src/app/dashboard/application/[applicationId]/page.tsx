import ApplicationDashboard from "@/components/ApplicationDashboard";
import { getAuthSession } from "@/lib/auth";
import { getApplication } from "@/lib/getApplication";
import React from "react";

interface pageProps {
  params: {
    applicationId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();
  const { applicationId } = params;
  const application = await getApplication(applicationId);

  if (application === null) {
    return <h1>Application not found</h1>;
  }

  if (application.ownerId !== session?.user?.id) {
    return <h1>You are not the owner</h1>;
  }

  return (
    <div>
      <ApplicationDashboard application={application} />
    </div>
  );
};

export default page;
