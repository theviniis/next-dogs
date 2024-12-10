// Dependencies: pnpm install lucide-react

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, LucideProps } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

const ProfileButtonAvatar = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt = "Profile image", className, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={32}
        height={32}
        className={cn("rounded-full not-prose", className)}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

ProfileButtonAvatar.displayName = "ProfileButtonAvatar";

const ProfileButtonIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ChevronDown {...props} ref={ref} className={cn("opacity-60", className)} aria-hidden="true">
        {children}
      </ChevronDown>
    );
  },
);

ProfileButtonIcon.displayName = "ProfileButtonIcon";

export { ProfileButtonIcon };

const ProfileButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <Button ref={ref} variant="ghost" className="h-auto p-0 hover:bg-transparent" {...props}>
      {children}
    </Button>
  );
});

ProfileButton.displayName = "ProfileButton";

export { ProfileButton, ProfileButtonAvatar };
