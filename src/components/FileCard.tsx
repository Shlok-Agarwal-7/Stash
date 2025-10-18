import React from "react";
import Thumbnail from "./Thumbnail";
import Link from "next/link";
import ActionsDropdown from "./ActionsDropdown";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const FileCard = ({ file }: { file: any }) => {
  return (
    <div className="file-card p-6 w-full relative">
      <div className="absolute top-2 right-2">
        <ActionsDropdown file={file} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="!size-20"
            imageClassName="!size-11"
          />
        </div>
      </div>
      <Link
        href={file.url}
        target="_blank"
        className="text-center flex flex-col gap-2 w-full auto-rows-max"
      >
        <p className="subtitle-1 w-full line-clamp-2">{file.name}</p>
        <div>
          <p className="caption">Size : {convertFileSize(file.size)}</p>
          <p className="caption">{formatDateTime(file.$createdAt)}</p>
        </div>
      </Link>
    </div>
  );
};

export default FileCard;
