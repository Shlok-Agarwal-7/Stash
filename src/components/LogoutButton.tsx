import Image from "next/image";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <Button variant="danger">
      <Image
        src="/assets/icons/logout.svg"
        alt="logout"
        width={16}
        height={16}
        className="cursor-pointer"
      />
      <p>Logout</p>
    </Button>
  );
};

export default LogoutButton;
