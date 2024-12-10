import { useState } from "react";
import HamburgerButton from "../ui/hamburger-button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MobileMenuItem } from "./mobile-menu-item";
import { MenuProps } from "./types";

export const MobileMenu = ({ options, pathname }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <HamburgerButton isExpanded={isExpanded} onExpand={setIsExpanded} />
      </PopoverTrigger>
      <PopoverContent className="w-min" align="end">
        <ul className="not-prose flex flex-col gap-2">
          {options.map((option) => (
            <MobileMenuItem
              key={option.id}
              className="w-full justify-start"
              option={option}
              isActive={pathname === option.href}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
