"use client";

import { useOrganization, useUser } from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import UploadButton from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useState } from "react";


export default function Home() {
  const organization= useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-12">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500"/>
          <div className="text-2xl">Loading files...</div>
        </div>
      )}
      
      {!isLoading && !query && files.length === 0 && (
        <div className="flex flex-col gap-12 w-full items-center mt-24">
          <Image 
            alt="an image of a picture and directory"
            width="300"
            height="300"
            src="/empty.svg"
          />
          <div className="text-2xl">
            You have no files, upload one now
          </div>
          <UploadButton />
        </div>
      )}

      {!isLoading && (
        <>
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold">Files</h1>
              <SearchBar query={query} setQuery={setQuery}/>
              <UploadButton />
            </div>

            {/* {files.length === 0 && (
              <div className="flex flex-col gap-12 w-full items-center mt-24">
                <Image 
                  alt="an image of a picture and directory"
                  width="300"
                  height="300"
                  src="/empty.svg"
                />
                <div className="text-2xl">
                  You have no files, upload one now
                </div>
                <UploadButton />
              </div>
            )} */}
      
            <div className="grid grid-cols-4 gap-4">
              {files?.map((file) => {
                return <FileCard key={file._id} file={file} />;
              })}
            </div>
        </>
      )}
    </main>
  );
}
