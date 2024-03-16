"use client";

import { ApplicationPublic } from "@/lib/types/application-public";
import { Lato } from "next/font/google";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import PublicApplicationItem from "./PublicApplicationItem";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface PublicApplicationsProps {}

const PublicApplications: React.FC<PublicApplicationsProps> = ({}) => {
  const [applications, setApplications] = useState<ApplicationPublic[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationPublic[]
  >([]);
  const [isloading, setIsloading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const getApplications = async () => {
      setIsloading(true);
      const applicationsResponse = await fetch(`/api/application-public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const applicationsData = await applicationsResponse.json();
      const { applications } = applicationsData;

      setApplications(applications);
      setFilteredApplications(applications); // Initialize filtered applications with the fetched data
      setIsloading(false);
    };

    getApplications();
  }, []);

  useEffect(() => {
    if (filterText === "") {
      setFilteredApplications(applications); // Reset filtered applications to the original list
    } else {
      const filteredApps = applications.filter((application) =>
        application.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredApplications(filteredApps); // Update filtered applications
    }
  }, [filterText, applications]);

  return (
    <div className="w-[95%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6 mb-4">
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center mb-6`}
      >
        Applications
      </h1>

      <div className="mb-3">
        <input
          type="text"
          spellCheck="false"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          id="sub-account-name"
          placeholder="Search Applications"
          className="w-full text-xl font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
        />
      </div>

      {isloading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!isloading && filteredApplications.length === 0 ? (
            <h1 className="text-green-500 text-xl font-medium text-center">
              No Applications Found
            </h1>
          ) : (
            <div className="flex flex-col gap-y-3">
              {filteredApplications.map((application) => (
                <PublicApplicationItem
                  application={application}
                  key={application.id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicApplications;
