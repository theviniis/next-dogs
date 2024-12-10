"use client";

import { useUserStore } from "@/context/user.context";
import { Comment } from "@/entities/Comment";
import hasAuthorization from "@/lib/authorization";
import { GetPhotoByIdHttpResponse } from "@/lib/service";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps, forwardRef, useCallback, useState } from "react";
import CommentPostForm from "../forms/comment-post";
import { PhotoComments } from "./photo-comments";
import { PhotoHeader } from "./photo-header";

export type PhotoContentProps = Omit<ComponentProps<"div">, "children"> & {
  data: GetPhotoByIdHttpResponse;
  isSingle?: boolean;
};

const PhotoContent = forwardRef<HTMLDivElement, PhotoContentProps>(
  ({ data, isSingle = false, className, ...props }, ref) => {
    const { user } = useUserStore();

    const hasPostPhotoAuthorization = hasAuthorization(user, "post:comments");

    const [comments, setComments] = useState(data?.comments || []);

    const handleSuccess = useCallback((comment: Comment) => {
      setComments((prev) => [...prev, comment]);
    }, []);

    if (!data) return null;

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "grid grid-rows-[repeat(4,auto)] lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto] gap-x-8 container h-full",
          className,
        )}
      >
        <Image
          src={data.photo.src}
          alt={data.photo.title}
          width={1500}
          height={1500}
          sizes="80vw"
          className="not-prose row-span-3 rounded"
        />
        <PhotoHeader photo={data.photo} user={user} />
        <PhotoComments className="p-8" comments={comments} isSingle={isSingle} />
        {hasPostPhotoAuthorization && (
          <CommentPostForm photoId={data.photo.id} isSingle={isSingle} onSuccess={handleSuccess} />
        )}
      </div>
    );
  },
);

PhotoContent.displayName = "PhotoContent";

export { PhotoContent };
