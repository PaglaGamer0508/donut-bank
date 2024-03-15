"use client";

import { getAllPublicApplications } from "@/lib/getAllPublicApplications";
import { ApplicationPublic } from "@/lib/types/application-public";
import { Lato } from "next/font/google";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface PublicApplicationsProps {}

const PublicApplications: React.FC<PublicApplicationsProps> = ({}) => {
  const [applications, setApplications] = useState<ApplicationPublic[]>([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const getApplications = async () => {
      setIsloading(true);
      const applications = await getAllPublicApplications();
      setApplications(applications);
      setIsloading(false);
    };

    getApplications();
  }, []);

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%] mx-auto mt-4 md:mt-6 mb-4">
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center mb-6`}
      >
        Applications
      </h1>

      {isloading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-y-3 items-center">
          {applications.map((application) => (
            <div key={application.id}>
              <h1>{application.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicApplications;
