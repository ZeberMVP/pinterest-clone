"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/Command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");

  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-[1420px] rounded-[40px] border"
    >
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
        }}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search"
      />

      {input.length > 0 ? (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          <CommandGroup heading="Recent searches">
            {/* {queryResults?.map((result) => (
              <CommandItem
                onSelect={(e) => {
                  router.push(`/r/${e}`);
                  router.refresh();
                }}
                key={result.id}
                value={result.name}
              >
                <a href={`/${result.name}`}>{result.name}</a>
              </CommandItem>
            ))} */}
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;
