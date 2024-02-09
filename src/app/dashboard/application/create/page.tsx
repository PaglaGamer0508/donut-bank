import CreateApplicationForm from "@/components/CreateApplicationForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <CreateApplicationForm user={session?.user!} />
      </div>
    </div>
  );
};

export default page;
