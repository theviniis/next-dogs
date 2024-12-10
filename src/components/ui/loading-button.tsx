import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { forwardRef } from "react";

export type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, disabled = false, children, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} disabled={disabled || isLoading}>
        {isLoading && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
        {children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
