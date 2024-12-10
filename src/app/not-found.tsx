import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-[var(--header-height)] grid place-content-center my-8">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button className="flex-1 no-underline" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
