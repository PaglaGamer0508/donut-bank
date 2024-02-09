import { Application } from "@/lib/types/application";
import React from "react";
import ApplicationItem from "./ApplicationItem";

interface AllApplicationContainerProps {
  applications: Application[];
}

const AllApplicationContainer: React.FC<AllApplicationContainerProps> = ({
  applications,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
      {applications.map((application) => (
        <ApplicationItem key={application.id} application={application} />
      ))}
    </div>
  );
};

export default AllApplicationContainer;
