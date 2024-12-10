import { userGet } from "@/action/user-get";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";
import { Button } from "../ui/button";

export type FeeedEmptyProps = ComponentProps<"div">;

const FeeedEmpty = forwardRef<HTMLDivElement, FeeedEmptyProps>(
  async ({ className, ...props }, ref) => {
    const user = await userGet();

    return (
      <div {...props} ref={ref} className={cn("space-y-2 min-h-dvh", className)}>
        <p className="my-0">Nenhuma foto encontrada</p>
        {user && (
          <Button asChild>
            <Link className="no-underline" href="/user/account/upload">
              Enviar foto
            </Link>
          </Button>
        )}
      </div>
    );
  },
);

FeeedEmpty.displayName = "FeeedEmpty";

export { FeeedEmpty };
