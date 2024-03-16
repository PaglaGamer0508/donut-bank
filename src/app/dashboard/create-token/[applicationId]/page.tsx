import React from "react";

interface pageProps {
  params: {
    applicationId: string;
  };
}

const page: React.FC<pageProps> = ({ params }) => {
  const { applicationId } = params;

  return <div>page</div>;
};

export default page;
