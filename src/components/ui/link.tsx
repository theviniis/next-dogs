import { cn } from "@/lib/utils";
import RouterLink from "next/link";
import { ComponentProps, forwardRef } from "react";
import { Button, ButtonProps } from "./button";

export type LinkProps = Replace<ComponentProps<"a">, { href: string }> & {
  variant?: ButtonProps["variant"];
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, variant = "link", className, ...props }, ref) => {
    return (
      <Button asChild variant={variant} className={cn(variant === "link" && "p-0")}>
        <RouterLink
          {...props}
          ref={ref}
          className={cn(variant !== "link" && "no-underline", className)}
        >
          {children}
        </RouterLink>
      </Button>
    );
  },
);

Link.displayName = "Link";

export { Link };
