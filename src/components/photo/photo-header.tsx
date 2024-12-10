import { Photo } from "@/entities/Photo";
import { User } from "@/entities/User";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";
import { Separator } from "../ui/separator";
import { PhotoDeleteButton } from "./photo-delete-button";

export type PhotoHeaderProps = Omit<ComponentProps<"div">, "children"> & {
  photo: Photo;
  user: User | null;
};

const PhotoHeader = forwardRef<HTMLDivElement, PhotoHeaderProps>(
  ({ className, photo, user, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn("px-8 pt-8 space-y-2", className)}>
        <div className="flex items-center justify-between text-zinc-400">
          {photo.author === user?.username ? (
            <PhotoDeleteButton photoId={photo.id}>Apagar</PhotoDeleteButton>
          ) : (
            <Link href={`/profile/${photo.author}`} className="no-underline text-inherit">
              @{photo.author}
            </Link>
          )}

          <div className="flex items-center gap-2">
            <Eye />
            <p className="m-0">{photo.acessos}</p>
          </div>
        </div>

        <h1>
          <Link href={`/photo/${photo.id}`} className="no-underline">
            {photo.title}
          </Link>
        </h1>

        <ul className="flex gap-8 p-0">
          <li className="flex items-center gap-2 m-0 p-0 font-bold">
            <Separator orientation="vertical" />
            <span>{photo.peso} kg</span>
          </li>
          <li className="flex items-center gap-2 m-0 p-0 font-bold">
            <Separator orientation="vertical" />
            <span>{photo.idade} anos</span>
          </li>
        </ul>
      </div>
    );
  },
);

PhotoHeader.displayName = "PhotoHeader";

export { PhotoHeader };
