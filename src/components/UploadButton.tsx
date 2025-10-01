import Image from "next/image";
import { Button } from "./ui/button";

const UploadButton = () => {
  return (
    <Button variant="primary">
      <Image
        src="/assets/icons/upload.svg"
        alt="upload"
        width={16}
        height={16}
      />
      Upload
    </Button>
  );
};

export default UploadButton;
