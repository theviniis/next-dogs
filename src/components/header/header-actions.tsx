import { userGet } from "@/action/user-get";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, forwardRef, Suspense } from "react";
import { Button } from "../ui/button";
import { UserNav } from "./user-nav";

export type HeaderActionProps = ComponentProps<"header">;

const HeaderActionsImpl = forwardRef<HTMLElement, HeaderActionProps>(
  async ({ className, ...props }, ref) => {
    const user = await userGet();

    return (
      <header {...props} ref={ref} className={cn("flex items-center gap-2", className)}>
        {user ? (
          <UserNav user={user} />
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link className="no-underline" href="/auth/signin">
                Entrar
              </Link>
            </Button>
            <Button asChild>
              <Link className="no-underline" href="/auth/signup">
                Cadastrar
              </Link>
            </Button>
          </>
        )}
      </header>
    );
  },
);

HeaderActionsImpl.displayName = "HeaderActionsImpl";

const HeaderActions = forwardRef<HTMLElement, HeaderActionProps>((props, ref) => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HeaderActionsImpl {...props} ref={ref} />
    </Suspense>
  );
});

HeaderActions.displayName = "HeaderActions";

export { HeaderActions };
