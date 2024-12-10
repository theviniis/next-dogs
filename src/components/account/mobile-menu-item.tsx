import Link from "next/link";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { MenuItemProps } from "./types";

function getVariant(isActive: boolean): ButtonProps["variant"] {
  if (isActive) return "default";
  return "ghost";
}

function isSignoutButton(href: string): boolean {
  return href === "/api/auth/signout";
}

const MobileMenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ option, isActive, ...props }, ref) => {
    return (
      <li>
        <Button variant={getVariant(isActive)} asChild ref={ref} {...props}>
          {isSignoutButton(option.href) ? (
            <a key={option.id} href={option.href}>
              {option.icon} {option.label}
            </a>
          ) : (
            <Link key={option.id} href={option.href}>
              {option.icon} {option.label}
            </Link>
          )}
        </Button>
      </li>
    );
  },
);

MobileMenuItem.displayName = "MobileMenuItem";

export { MobileMenuItem };
