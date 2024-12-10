import { ErrorData } from "@/lib/Exception";
import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export type FormErrorProps = ComponentProps<"ul"> & {
  errors: ErrorData[];
};

const FormError = forwardRef<HTMLUListElement, FormErrorProps>(
  ({ className, errors = [], ...props }, ref) => {
    return (
      <ul {...props} ref={ref} className={cn("", className)}>
        {errors.map((error) => (
          <li key={error.id} className="flex items-start gap-1">
            <strong>{error.path}</strong>
            <p className="m-0">{error.message}</p>
          </li>
        ))}
      </ul>
    );
  },
);

FormError.displayName = "FormError";

export { FormError };
