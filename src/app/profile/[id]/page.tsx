import photoGet from "@/action/photo-get";
import { Feed } from "@/components/feed/feed";

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await photoGet({ user: params.id });
  if (!data) return null;
  return (
    <main className="min-h-dvh container my-6 pt-[var(--header-height)]">
      <h1 className="capitalize">{params.id}</h1>
      <Feed username={params.id} />
    </main>
  );
}
