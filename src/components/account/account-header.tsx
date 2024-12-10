"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import options from "./nav-items";

const getPageTitle = (pathname: string) => {
  const option = options.find((option) => option.href === pathname);
  if (!option) return options[0].label;
  return option.label;
};

const getRenderComponent = (isMobile: boolean) => {
  return isMobile ? MobileMenu : DesktopMenu;
};

export const AccountHeader = () => {
  const isMobile = useMediaQuery("(max-width: 40rem)");
  const pathname = usePathname();
  const Comp = getRenderComponent(isMobile);

  return (
    <header className="flex items-center justify-between my-5">
      <h1 className="m-0">{getPageTitle(pathname)}</h1>
      <ul className="flex items-center gap-2 justify-start not-prose">
        {<Comp options={options} pathname={pathname} />}
      </ul>
    </header>
  );
};
