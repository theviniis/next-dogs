import { AccountHeader } from "@/components/account/account-header";
import { ReactNode } from "react";

export default function ContaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container pt-[var(--header-height)] min-h-dvh">
      <AccountHeader />
      {children}
    </div>
  );
}
