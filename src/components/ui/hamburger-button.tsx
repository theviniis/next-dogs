import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HamburgerButtonProps = {
  isExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
} & ButtonProps;

export default function HamburgerButton({
  className,
  isExpanded = false,
  onExpand,
  onClick,
  ...props
}: HamburgerButtonProps) {
  return (
    <Button
      {...props}
      className={cn("group p-0 w-[48px] h-[36px]", className)}
      variant="secondary"
      size="icon"
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Close menu" : "Open menu"}
      onClick={(e) => {
        onExpand?.(!isExpanded);
        onClick?.(e);
      }}
    >
      <svg
        className="pointer-events-none"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
}
