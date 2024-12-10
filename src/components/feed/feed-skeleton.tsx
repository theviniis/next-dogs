import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";
import { Skeleton } from "../ui/skeleton";

export type FeedSkeletonProps = ComponentProps<"div"> & {
  count?: number;
};

const FeedSkeleton = forwardRef<HTMLDivElement, FeedSkeletonProps>(
  ({ className, count = 9, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn("space-y-4 mb-5 min-h-dvh", className)}>
        <ul className="not-prose grid grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <li
              key={index}
              className="not-prose list-none [&:nth-child(2)]:col-start-2 [&:nth-child(2)]:col-end-4 [&:nth-child(2)]:row-span-2"
            >
              <Skeleton className="w-full aspect-square" />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

FeedSkeleton.displayName = "FeedSkeleton";

export { FeedSkeleton };
