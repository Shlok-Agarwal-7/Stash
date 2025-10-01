import Image from "next/image";
import { Button } from "./ui/button";
import Search from "./Search";
import UploadButton from "./UploadButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <div className="bg-surface-a10 p-4  text-dark-a0 lg:flex justify-between items-center px-10 hidden ">
      <div className="flex items-center bg-surface-a20 rounded-2xl">
        <Search />
      </div>
      <div className="flex items-center gap-6">
        <UploadButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
