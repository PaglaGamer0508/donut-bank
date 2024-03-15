"use client";

import { toast } from "@/hooks/useToast";
import { isValidURL } from "@/lib/isValidURL";
import { AddEditApplicationURLValidatorType } from "@/lib/validators/AddEditApplicationURLValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Lato } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import DeleteUrlButton from "./DeleteUrlButton";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface WebsiteURLProps {
  application_id: string;
  websiteURL: string | null;
}

const WebsiteURL: React.FC<WebsiteURLProps> = ({
  websiteURL,
  application_id,
}) => {
  const router = useRouter();

  const [URL, setURL] = useState("");
  const [editURL, setEditURL] = useState(URL);
  const [editMode, setEditMode] = useState(false);

  const onEditClick = () => {
    setEditMode(true);
  };

  const onCancelClick = () => {
    setEditURL(URL);
    setEditMode(false);
  };

  useEffect(() => {
    if (!websiteURL) {
      setURL("");
    } else {
      setURL(websiteURL);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddEditApplicationURLData: AddEditApplicationURLValidatorType = {
    application_id: application_id,
    url: editURL,
  };

  const { mutate: UpdateApplicationURL, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        "/api/application/website-url",
        AddEditApplicationURLData
      );
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setEditMode(false);
      setURL(editURL);
    },
  });

  const onSaveClick = () => {
    const isValid = isValidURL(editURL);
    if (!isValid) {
      return toast({
        title: "Error",
        description: "Not a valid URL",
        variant: "destructive",
        duration: 1000,
      });
    }
    UpdateApplicationURL();
  };

  return (
    <div>
      <div className="border-2 border-green-500 rounded-lg overflow-hidden">
        <div className="bg-green-500 py-1 px-3">
          <h1 className={`${lato.className} text-lg text-white`}>
            Website URL
          </h1>
        </div>
        <div className="flex justify-between items-center gap-2 bg-white">
          <input
            disabled={!editMode}
            onChange={(e) => setEditURL(e.target.value)}
            placeholder={!editMode && !websiteURL ? "Add a website URL" : ""}
            type="url"
            value={editMode ? editURL : URL}
            className={`${
              editMode ? "text-black" : "text-green-500"
            } h-full w-full bg-transparent outline-none text-xl font-semibold p-1`}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 h-10 mt-2">
        {editMode ? (
          <>
            <Button
              disabled={editURL === URL || isPending}
              onClick={onSaveClick}
              variant={"primary"}
              className="h-full"
            >
              Save
            </Button>
            <Button
              disabled={isPending}
              variant={"primary"}
              className="h-full"
              onClick={onCancelClick}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {websiteURL ? (
              <div className="flex justify-between items-center gap-2 h-full w-full">
                <Button
                  disabled={isPending}
                  variant={"primary"}
                  className="h-full"
                  onClick={onEditClick}
                >
                  Edit
                </Button>
                <DeleteUrlButton application_id={application_id} />
              </div>
            ) : (
              <Button
                disabled={isPending}
                variant={"primary"}
                className="h-full"
                onClick={onEditClick}
              >
                Add
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WebsiteURL;
