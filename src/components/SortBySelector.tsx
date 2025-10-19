"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortItems } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortBySelector = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || SortItems[0].value;

  const handleSort = (value: string) => {
    // console.log(path);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);

    router.push(`${path}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={currentSort}>
      <SelectTrigger className="w-full md:max-w-[220px] border-0 ">
        <SelectValue
          className="placeholder:text-dark-a0 text-dark-a0"
          placeholder={SortItems[0].name}
        />
      </SelectTrigger>
      <SelectContent>
        {SortItems.map((sortItem) => (
          <SelectItem value={sortItem.value} key={sortItem.value}>
            {sortItem.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBySelector;
