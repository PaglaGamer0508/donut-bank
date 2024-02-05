"use client";

import Logo from "@/../public/donut.png";
import { useImagePreviewState } from "@/lib/global-state-store/imagePreviewState";
import { cn } from "@/lib/utils";
import { CreateCompanyValidatorType } from "@/lib/validators/CreateCompanyValidator";
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

interface CreateCompanyFormProps {
  user: User;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({ user }) => {
  const router = useRouter();

  const { imageUrl, removePreviewImage } = useImagePreviewState();

  // states
  const [companyName, setCompanyName] = useState("");
  const [errorMassage, setErrorMessage] = useState("");

  const createCompanyData: CreateCompanyValidatorType = {
    companyLogo: imageUrl!,
    companyName,
    userId: user.id,
    email: user.email!,
  };

  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/company/create", createCompanyData);
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
      return toast({
        title: "Success",
        description: "Sub account created successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedCompanyName = companyName.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    setCompanyName(cleanedCompanyName);

    if (cleanedCompanyName.length < 5) {
      setErrorMessage("Company name must be at least 5 characters");
    } else if (cleanedCompanyName.length > 50) {
      setErrorMessage("Company name can't be more than 50 characters");
    } else if (/^\d+$/.test(cleanedCompanyName)) {
      setErrorMessage("Company name cannot contain only numbers");
    } else if (!imageUrl) {
      setErrorMessage("Please select a logo");
    } else {
      setErrorMessage("");
      createCompany();
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
        Create a Company
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
          {/* Company Name */}
          <div className="flex flex-col">
            <label
              htmlFor="account-name"
              className="text-lg font-semibold text-green-500"
            >
              Company Name
            </label>
            <input
              type="text"
              spellCheck="false"
              id="account-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter Company Name"
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
              Create Company
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyForm;
