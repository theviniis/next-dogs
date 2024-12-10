import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

export type SubmitButtonProps = ComponentProps<"button">;

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Button {...props} ref={ref} className={cn("", className)} disabled={pending}>
        {pending ? "Enviando..." : children}
      </Button>
    );
  },
);

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
