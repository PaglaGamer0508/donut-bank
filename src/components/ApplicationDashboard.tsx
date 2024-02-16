import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { Application } from "@/lib/types/application";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";
import CopyText from "./CopyText";
import { Icons } from "./Icons";
import Link from "next/link";
import { Code2 } from "lucide-react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface applicationDashboardProps {
  application: Application;
}

const ApplicationDashboard: React.FC<applicationDashboardProps> = ({
  application,
}) => {
  return (
    <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <Image
            alt="Logo"
            src={application.logo}
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg"
          />

          <div>
            <h1
              className={`${lato.className} text-3xl md:text-4xl text-green-500`}
            >
              {application.name}
            </h1>
            <div className="flex items-center gap-x-2">
              <p title="application ID" className="text-slate-500 font-medium">
                {application.applicationId}
              </p>
              <CopyText
                title="Copy application ID"
                text={application.applicationId}
              />
            </div>
          </div>
        </div>

        {/* application Balance */}
        <div className="sm:w-fit bg-green-200/75 px-3 py-2 rounded-lg">
          <p className="text-sm font-medium text-emerald-500">
            Application Balance
          </p>
          <h1
            className={`flex items-center ${lato.className} text-3xl text-green-900`}
          >
            <Icons.donutCoin className="w-8" fill="#14532d" />
            <span>{formatAmountWithCommas(application.balance)}</span>
          </h1>
        </div>
      </div>

      {/* developers option */}
      <div>
        <Link
          href={`/dashboard/application/${application.applicationId}/developers`}
          className={`flex items-center gap-x-1 w-fit bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg py-1 px-3 mt-2 transition-all duration-75`}
        >
          <Code2 />
          <span>Developers Options</span>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationDashboard;
