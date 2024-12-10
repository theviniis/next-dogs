import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";
import { Logo } from "../ui/logo";
import { HeaderActions } from "./header-actions";

export type HeaderProps = ComponentProps<"header">;

const Header = forwardRef<HTMLElement, HeaderProps>(({ className, ...props }, ref) => {
  return (
    <header
      {...props}
      ref={ref}
      className={cn(
        "nav py-2 shadow-sm h-[var(--header-height)] fixed top-0 bg-background w-full flex items-center",
        className,
      )}
    >
      <nav className="container flex items-center justify-between">
        <Logo />
        <HeaderActions />
      </nav>
    </header>
  );
});

Header.displayName = "Header";

export { Header };
