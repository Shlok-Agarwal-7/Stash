import React from "react";
import Thumbnail from "./Thumbnail";
import Link from "next/link";
import ActionsDropdown from "./ActionsDropdown";

const FileCard = ({ file }: { file: any }) => {
  return (
    <div className="file-card p-6 relative">
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
      <Link href={file.url} target="_blank" className="text-center">
        {file.name}
      </Link>
    </div>
  );
};

export default FileCard;
