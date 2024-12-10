"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error({ error });
  }, [error]);

  return (
    <div className="pt-[var(--header-height)] grid place-content-center my-8">
      <h2>Something went wrong!</h2>
      <p>{error?.message}</p>
      <div className="flex items-center gap-2">
        <Button className="flex-1" onClick={() => router.back()} variant="secondary">
          Go back
        </Button>
        <Button className="flex-1 no-underline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
