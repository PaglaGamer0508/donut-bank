import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { Application } from "@/lib/types/application";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";
import CopyText from "./CopyText";
import { Icons } from "./Icons";
import Link from "next/link";
import { Code2, ExternalLink, Settings } from "lucide-react";
import { buttonVariants } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface applicationDashboardProps {
  application: Application;
}

const ApplicationDashboard: React.FC<applicationDashboardProps> = ({
  application,
}) => {
  return (
    <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
      <div className="sm:flex sm:items-center sm:justify-between gap-2">
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

      {/* Settings and Website URL */}
      <div className="md:flex items-center gap-2 mt-2">
        <Link
          href={`/dashboard/application/${application.applicationId}/developers`}
          className={`${buttonVariants({
            variant: "primary",
          })} flex items-center gap-x-1`}
        >
          <Settings className="w-6 h-6" />
          <span>Settings</span>
        </Link>

        {!application.websiteUrl ? (
          <Link
            href={`/dashboard/application/${application.applicationId}/developers`}
            className="block h-4 text-red-500 font-medium text-center hover:underline"
          >
            Set the URL to your Website
          </Link>
        ) : (
          <Link
            target="_blank"
            href={application.websiteUrl}
            className={`${buttonVariants({
              variant: "primary",
            })} flex items-center gap-x-1`}
          >
            <ExternalLink className="w-6 h-6" />
            <span>Go to Website</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ApplicationDashboard;
