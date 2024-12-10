import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export type PhotoPostPreviewProps = ComponentProps<"div"> & {
  src: string;
  alt: string;
};

const PhotoPostPreview = forwardRef<HTMLDivElement, PhotoPostPreviewProps>(
  ({ className, style, src, alt, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("bg-cover rounded", className)}
        style={{ ...style, backgroundImage: `url(${src})` }}
        aria-label={alt}
      />
    );
  },
);

PhotoPostPreview.displayName = "PhotoPostPreview";

export { PhotoPostPreview };
