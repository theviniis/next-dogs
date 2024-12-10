"use client";

import { GetPhotoByIdHttpResponse } from "@/lib/service";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { ComponentProps, forwardRef, useCallback, useEffect } from "react";
import { PhotoContent } from "./photo-content";

export type PhotoModalProps = Omit<ComponentProps<"div">, "children"> & {
  data: GetPhotoByIdHttpResponse;
};

const PhotoModal = forwardRef<HTMLDivElement, PhotoModalProps>(
  ({ data, className, ...props }, ref) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleOutSideClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          router.back();
        }
      },
      [router],
    );

    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          router.back();
        }
      },
      [router],
    );

    useEffect(() => {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }, [handleEscape]);

    if (!pathname.includes("photo")) {
      return null;
    }

    return (
      <div
        {...props}
        ref={ref}
        className={cn("fixed w-full h-dvh top-0 left-0 bg-black/30 z-10 p-4", className)}
        role="dialog"
        onClick={handleOutSideClick}
      >
        <div className="container rounded bg-background p-4 overflow-y-auto max-h-[80dvh]">
          <PhotoContent data={data} className="p-0" />
        </div>
      </div>
    );
  },
);

PhotoModal.displayName = "PhotoModal";

export { PhotoModal };
