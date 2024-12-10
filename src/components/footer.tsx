import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";
import { Logo } from "./ui/logo";

export type FooterProps = ComponentProps<"footer">;

const Footer = forwardRef<HTMLElement, FooterProps>(({ className, ...props }, ref) => {
  return (
    <footer {...props} ref={ref} className={cn("bg-primary grid place-content-center", className)}>
      <Logo />
      <p className="m-0">Dogs. Alguns direitos reservados.</p>
    </footer>
  );
});

Footer.displayName = "Footer";

export { Footer };
