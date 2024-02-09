import AllApplicationContainer from "@/components/AllApplicationContainer";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getAllApplications } from "@/lib/getAllApplications";
import { hasApplication } from "@/lib/hasApplication";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const applications = await getAllApplications(session?.user?.id!);

  return (
    <div>
      <div className="flex justify-between items-center bg-blue-100/70 p-3">
        <h1 className={`${lato.className} text-2xl font-bold text-green-500`}>
          All Applications
        </h1>

        <Link
          href={`/dashboard/application/create`}
          className={`${buttonVariants({ variant: "primary" })}`}
        >
          Create New
        </Link>
      </div>
      <AllApplicationContainer applications={applications} />
    </div>
  );
};

export default page;
