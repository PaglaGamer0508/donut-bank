"use client";

import Logo from "@/../public/donut.png";
import { useImagePreviewState } from "@/lib/global-state-store/imagePreviewState";
import { cn } from "@/lib/utils";
import { CreateApplicationValidatorType } from "@/lib/validators/CreateApplicationValidator";
import { Trash2 } from "lucide-react";
import { User } from "next-auth";
import { Lato } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import ImageUploadDnD from "./ImageUploadDnD";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface CreateApplicationFormProps {
  user: User;
}

const CreateApplicationForm: React.FC<CreateApplicationFormProps> = ({
  user,
}) => {
  const router = useRouter();

  const { imageUrl, removePreviewImage } = useImagePreviewState();

  const clearData = () => {
    removePreviewImage();
    setapplicationName("");
  };

  // states
  const [applicationName, setapplicationName] = useState("");
  const [errorMassage, setErrorMessage] = useState("");

  const createapplicationData: CreateApplicationValidatorType = {
    applicationLogo: imageUrl!,
    applicationName,
    userId: user.id,
    email: user.email!,
  };

  const { mutate: createapplication, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/application/create", createapplicationData);
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      clearData();
      router.refresh();
      return toast({
        title: "Success",
        description: "Sub account created successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedapplicationName = applicationName.replace(
      /^\s+|\s+$|\s+(?=\s)/g,
      ""
    );
    setapplicationName(cleanedapplicationName);

    if (cleanedapplicationName.length < 5) {
      setErrorMessage("application name must be at least 5 characters");
    } else if (cleanedapplicationName.length > 50) {
      setErrorMessage("application name can't be more than 50 characters");
    } else if (/^\d+$/.test(cleanedapplicationName)) {
      setErrorMessage("application name cannot contain only numbers");
    } else if (!imageUrl) {
      setErrorMessage("Please select a logo");
    } else {
      setErrorMessage("");
      createapplication();
    }
  };

  return (
    <div
      className={cn(
        "shadow-lg rounded-lg w-full border-2 border-green-500 p-5 pt-0"
      )}
    >
      <div className="flex justify-center py-2">
        <Image
          alt="Logo"
          src={Logo}
          className="w-14"
          width={256}
          height={256}
        />
      </div>
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center hover:cursor-default`}
      >
        Create a application
      </h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="space-y-2">
          {!imageUrl ? (
            <div>
              <p className="text-lg font-semibold text-green-500">
                Choose a Logo
              </p>
              <ImageUploadDnD />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-green-500">
                  Selected Logo
                </p>

                <button
                  type="button"
                  onClick={removePreviewImage}
                  className="bg-red-500 hover:bg-red-600 rounded-lg py-1 px-2 active:scale-95 transition-all duration-75"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
              <Image
                src={imageUrl}
                height={80}
                width={80}
                className="h-20 w-20 object-cover rounded-lg mx-auto"
                alt="Selected Image"
              />
            </div>
          )}
          {/* application Name */}
          <div className="flex flex-col">
            <label
              htmlFor="account-name"
              className="text-lg font-semibold text-green-500"
            >
              application Name
            </label>
            <input
              type="text"
              spellCheck="false"
              id="account-name"
              value={applicationName}
              onChange={(e) => setapplicationName(e.target.value)}
              placeholder="Enter application Name"
              minLength={5}
              maxLength={30}
              required
              className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
            />
          </div>

          {/* error message */}
          <div className="my-1">
            <p className="h-5 text-center text-sm text-red-500 font-medium">
              {errorMassage}
            </p>
          </div>
          <div className="mt-2">
            <Button
              isLoading={isPending}
              disabled={isPending}
              type="submit"
              className="w-full text-xl font-semibold rounded p-2 text-green-500 hover:text-white border border-green-500 bg-white hover:bg-green-500 transition-all duration-75 active:scale-95"
            >
              Create application
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateApplicationForm;
