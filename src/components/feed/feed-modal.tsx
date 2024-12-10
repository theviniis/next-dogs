"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export type FeedModalProps = ComponentProps<"div">;

const FeedModal = forwardRef<HTMLDivElement, FeedModalProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn("", className)}>
        {children}
      </div>
    );
  },
);

FeedModal.displayName = "FeedModal";

export { FeedModal };
