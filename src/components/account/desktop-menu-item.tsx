import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { MenuItemProps } from "./types";

function isSignoutButton(href: string): boolean {
  return href === "/api/auth/signout";
}

const DesktopMenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, option, isActive, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <li className={cn("not-prose list-none", className)}>
              <Button ref={ref} variant={isActive ? "default" : "secondary"} asChild {...props}>
                {isSignoutButton(option.href) ? (
                  <a href={option.href}>{option.icon}</a>
                ) : (
                  <Link href={option.href}>{option.icon}</Link>
                )}
              </Button>
            </li>
          </TooltipTrigger>
          <TooltipContent align="start" side="bottom">
            {option.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

DesktopMenuItem.displayName = "DesktopMenuItem";

export { DesktopMenuItem };
