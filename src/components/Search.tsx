"use client";

import { fetchFiles } from "@/lib/userActions/file.actions";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Thumbnail from "./Thumbnail";
import { formatDateTime } from "@/lib/utils";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [debouncedQuery] = useDebounce(query, 300);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const getFiles = async () => {
        const files = await fetchFiles({ type: "", searchQuery: query });

        setResults(files.rows);
        setIsOpen(true);
      };

      getFiles();
    } else {
      setQuery("");
      setIsOpen(false);
      return router.push(path.replace(searchParams.toString(), ""));
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleOnClick = (file: any) => {
    setResults([]);
    setIsOpen(false);

    router.push(`${file.type}/?query=${query}`);
  };
  return (
    <div className="relative w-full md:max-w-[480px]">
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
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="input"
        />
      </div>
      {isOpen && (
        <ul className="absolute left-0 top-12 z-50 flex w-full flex-col gap-3 rounded-2xl bg-surface-a20 p-3">
          {results.length > 0 ? (
            results.map((file: any) => (
              <li key={file.$id} onClick={() => handleOnClick(file)}>
                <div className="flex justify-between items-center cursor-pointer">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />
                  <p className="truncate subtitle-2">{file.name}</p>
                  <p className="truncate caption">
                    {formatDateTime(file.$createdAt)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="body-2 text-center text-dark-a0"> No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
