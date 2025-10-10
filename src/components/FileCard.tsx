import React from "react";
import Thumbnail from "./Thumbnail";
import Link from "next/link";
import ActionsDropdown from "./ActionsDropdown";

const FileCard = ({ file }: { file: any }) => {
  console.log(file);
  return (
    <div className="file-card p-6">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <ActionsDropdown file={file} />
      </div>
      <Link href={file.url} target="_blank" className="text-center">
        {file.name}
      </Link>
    </div>
  );
};

export default FileCard;
