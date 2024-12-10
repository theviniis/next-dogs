import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps, forwardRef } from "react";
import src from "../../../public/enviar.svg";

export type ButtonDogsProps = Omit<ComponentProps<"button">, "children">;

const ButtonDogs = forwardRef<HTMLButtonElement, ButtonDogsProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "grid place-content-center px-5 py-2 bg-secondary disabled:opacity-80 disabled:cursor-not-allowed",
          className,
        )}
      >
        <Image
          src={src}
          alt="Imagem de um cachorro vetorizada"
          width={60}
          height={60}
          sizes="80vw"
          className="ms-1"
        />
      </button>
    );
  },
);

ButtonDogs.displayName = "ButtonDogs";

export { ButtonDogs };
