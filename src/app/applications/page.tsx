import PublicApplications from "@/components/PublicApplications";
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
