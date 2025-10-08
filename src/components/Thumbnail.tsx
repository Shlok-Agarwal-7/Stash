import { getFileIcon } from "@/lib/utils";
import Image from "next/image";

const Thumbnail = ({
  type,
  extension,
}: {
  type: string;
  extension: string;
}) => {
  return (
    <figure className="thumbnail">
      <Image
        src={getFileIcon(extension, type)}
        height={100}
        width={100}
        alt="file-icon"
        className="size-9 object-contain"
      />
    </figure>
  );
};

export default Thumbnail;
