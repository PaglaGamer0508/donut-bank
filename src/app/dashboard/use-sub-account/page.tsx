import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div className="grid place-items-center p-5">
      <h1 className="text-3xl font-semibold text-green-500">
        Use Another Sub Account
      </h1>
      <h2 className="text-4xl font-bold text-red-500 mt-10">
        This feature is not yet available
      </h2>
    </div>
  );
};

export default page;
