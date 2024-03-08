"use client";

import { Application } from "@/lib/types/application";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface ApplicationItemProps {
  application: Application;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({ application }) => {
  const router = useRouter();

  return (
    <Link
      href={`/dashboard/application/${application.applicationId}`}
      className="bg-white p-3 border-2 border-gray-300 hover:border-green-500 transition-all duration-150 rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-x-2">
        <Image
          alt="logo"
          src={application.logo}
          width={128}
          height={128}
          className="w-12 h-12 rounded-md"
        />
        <div>
          <h1 className={`${lato.className} text-xl text-green-500`}>
            {application.name}
          </h1>
          <p className="text-slate-500 font-medium">
            {application.applicationId}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationItem;
