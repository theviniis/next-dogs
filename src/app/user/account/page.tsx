import { userGet } from "@/action/user-get";
import { Feed } from "@/components/feed/feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function UserAccountPage() {
  const user = await userGet();

  return (
    <main>
      <Feed username={user?.username} />
    </main>
  );
}
