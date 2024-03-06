import React from "react";

interface pageProps {
  params: {
    transactionId: string;
  };
}

const page: React.FC<pageProps> = ({ params }) => {
  const { transactionId } = params;
  return <div>page</div>;
};

export default page;
