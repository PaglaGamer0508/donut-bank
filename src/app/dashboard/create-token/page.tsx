import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  redirect("/applications");

  return null;
};

export default page;
