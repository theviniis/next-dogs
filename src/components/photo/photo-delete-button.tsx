"use client";

import photoDelete from "@/action/photo-delete";
import { Photo } from "@/entities/Photo";
import queryClient from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "sonner";
import { ButtonProps } from "../ui/button";
import { LoadingButton } from "../ui/loading-button";

export type PhotoDeleteButtonProps = Omit<ButtonProps, "onCLick"> & {
  photoId: Photo["id"];
};

const PhotoDeleteButton = forwardRef<HTMLButtonElement, PhotoDeleteButtonProps>(
  ({ className, variant = "secondary", photoId, children, ...props }, ref) => {
    const router = useRouter();
    const { mutateAsync, isLoading } = useMutation({
      mutationKey: ["photoDelete"],
      mutationFn: photoDelete,
      onSettled: async () => {
        queryClient.invalidateQueries(["photos"]);
      },
    });

    const handleClick = async () => {
      const confirm = window.confirm("Are you sure you want to delete this photo?");
      if (!confirm) return;
      try {
        const message = await mutateAsync(photoId);
        toast.success(message);
        router.push("/user/account");
      } catch (err) {
        toast.error(err.message);
      }
    };

    return (
      <LoadingButton
        {...props}
        ref={ref}
        className={cn("", className)}
        onClick={handleClick}
        variant={variant}
        size="sm"
        isLoading={isLoading}
      >
        {children}
      </LoadingButton>
    );
  },
);

PhotoDeleteButton.displayName = "PhotoDeleteButton";

export { PhotoDeleteButton };
