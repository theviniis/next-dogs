import { Photo } from "@/entities/Photo";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";

export type FeedItemProps = Omit<ComponentProps<"a">, "children"> & {
  photo: Photo;
};

const FeedItem = forwardRef<HTMLAnchorElement, FeedItemProps>(({ photo, ...props }, ref) => {
  if (!photo.src) return null;
  return (
    <Link {...props} ref={ref} key={photo.id} href={`/photo/${photo.id}`} scroll={false}>
      <Image
        className="rounded not-prose"
        src={photo.src}
        width={1500}
        height={1500}
        alt={photo.title}
        sizes="80vw"
      />
    </Link>
  );
});

FeedItem.displayName = "FeedItem";

export { FeedItem };
