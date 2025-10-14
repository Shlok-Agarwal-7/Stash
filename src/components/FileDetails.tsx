"use client";

import { convertFileSize, formatDateTime } from "@/lib/utils";
import { ImageThumbnail } from "./ImageThumbnail";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/userActions/user.actions";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: any }) => {
  const [ownerName, setOwnerName] = useState("Loading...");

  useEffect(() => {
    const fetchOwner = async () => {
      if (typeof file.owner === "string") {
        const ownerData = await getUserById(file.owner);
        if (ownerData) {
          setOwnerName(ownerData.fullName);
        } else {
          setOwnerName("Unknown");
        }
      } else if (file.owner?.fullName) {
        setOwnerName(file.owner.fullName);
      }
    };

    fetchOwner();
  }, [file.owner]);

  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={ownerName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};
