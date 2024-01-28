import AddQuickSendMoneyAccountSearch from "@/components/AddQuickSendMoneyAccountSearch";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
        <AddQuickSendMoneyAccountSearch />
      </div>
    </div>
  );
};

export default page;
