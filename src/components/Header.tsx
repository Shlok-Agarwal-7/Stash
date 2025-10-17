import Search from "./Search";
import UploadButton from "./UploadButton";
import LogoutButton from "./LogoutButton";

const Header = ({ ...currentUser }: UserProps) => {
  return (
    <div className="bg-surface-a10 p-4  text-dark-a0 lg:flex justify-between items-center px-10 hidden ">
      <Search />
      <div className="flex items-center gap-6">
        <UploadButton {...currentUser} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
