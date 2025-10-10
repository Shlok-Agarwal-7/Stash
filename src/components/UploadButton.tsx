"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { UploadFile } from "@/lib/userActions/file.actions";

const UploadButton = ({ accountID, $id }: UserProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          return toast.error(`The file ${file.name} is too large (>=30 MB)`);
        }

        return UploadFile({ file, ownerID: $id, accountID, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [$id, accountID, path]
  );

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      <Button variant="primary">
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={16}
          height={16}
        />
        <p className="text-white"> Upload </p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4">Uploading..</h4>
          {files.map((file, key) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li key={`${file.name}-${key}`} className="uploader-preview-item">
                <Thumbnail
                  type={type}
                  extension={extension}
                  url={convertFileToUrl(file)}
                />
                <div className="flex items-center">
                  <h3 className="h3">{file.name}</h3>
                </div>
                <Image
                  src="assets/icons/close.svg"
                  alt="close"
                  height={20}
                  width={20}
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  className="cursor-pointer"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UploadButton;
