import PublicApplications from "@/components/PublicApplications";
import { getAllPublicApplications } from "@/lib/getAllPublicApplications";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div className="mt-[74px]">
      <PublicApplications />
    </div>
  );
};

export default page;
