"use client";

import { GetPhotoByIdHttpResponse } from "@/lib/service";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";

export type PhotoCommentsProps = Omit<ComponentProps<"ul">, "children"> & {
  comments: GetPhotoByIdHttpResponse["comments"];
  isSingle: boolean;
};

const PhotoComments = ({ className, comments = [], isSingle, ...props }: PhotoCommentsProps) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [comments]);

  return (
    <ul
      {...props}
      ref={ref}
      className={cn(
        "m-0 p-0 space-y-2 overflow-y-auto text-balance",
        isSingle && "px-0",
        className,
      )}
    >
      {comments.map((comment) => (
        <li key={comment.comment_ID} className="m-0 p-0 flex items-center gap-1">
          <p className="m-0 p-0 font-bold">{comment.comment_author}:</p>
          <p className="m-0 p-0">{comment.comment_content}</p>
        </li>
      ))}
    </ul>
  );
};

PhotoComments.displayName = "PhotoComments";

export { PhotoComments };
