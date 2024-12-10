import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../../public/dogs.svg";
import { Link } from "./link";

export type LogoProps = { className?: string };

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className="p-0 not-prose" aria-label="Página inicial">
      <Image
        className={cn("not-prose p-1", className)}
        src={logo}
        alt="Ilustração de cachorro minimalista"
      />
    </Link>
  );
};

Logo.displayName = "Logo";

export { Logo };
