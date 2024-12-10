import { DesktopMenuItem } from "./desktop-menu-item";
import { MenuProps } from "./types";

export const DesktopMenu = ({ options, pathname }: MenuProps) => {
  return (
    <>
      {options.map((option) => (
        <DesktopMenuItem key={option.id} option={option} isActive={pathname === option.href} />
      ))}
    </>
  );
};
