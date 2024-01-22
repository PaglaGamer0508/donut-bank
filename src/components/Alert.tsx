"use client";

import React, { useState } from "react";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="alert">
          <span>{message}</span>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  );
};

export default Alert;
