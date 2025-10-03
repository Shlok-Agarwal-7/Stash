"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/userActions/user.actions";

const LogoutButton = () => {
  return (
    <Button
      variant="danger"
      onClick={async () => {
        await signOutUser();
      }}
    >
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
