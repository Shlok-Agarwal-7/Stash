import Image from "next/image";

const Search = () => {
  return (
    <div className="flex items-center px-3 py-2 bg-surface-a20 rounded-2xl">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={16}
        height={16}
      />
      <input
        type="text"
        placeholder="Search in your stash..."
        className="bg-transparent placeholder:text-muted-foreground focus:outline-none ml-2 hover:placeholder:text-primary-a20"
      />
    </div>
  );
};

export default Search;
