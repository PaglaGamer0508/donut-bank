import { ApplicationPublic } from "@/lib/types/application-public";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";
import CopyText from "./CopyText";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { ExternalLink, Plus } from "lucide-react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface PublicApplicationItemProps {
  application: ApplicationPublic;
}

const PublicApplicationItem: React.FC<PublicApplicationItemProps> = ({
  application,
}) => {
  return (
    <div className="bg-white p-3 border-2 border-green-500 transition-all duration-150 rounded-lg shadow-sm">
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
      <div className="flex gap-2 mt-2">
        <Link
          href={`/dashboard/create-token/${application.applicationId}`}
          className={`${buttonVariants({
            variant: "primary",
          })} flex items-center gap-x-1`}
        >
          <span>Create Token</span>
          <Plus className="w-5 h-5" />
        </Link>
        {application.websiteUrl && (
          <Link
            target="_blank"
            href={application.websiteUrl}
            className={`${buttonVariants({
              variant: "primary",
            })} flex items-center gap-x-1`}
          >
            <span>Go to Website</span>
            <ExternalLink className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PublicApplicationItem;
