import PasswordResetForm from "@/components/forms/password-reset-form";

type PasswordResetPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PasswordResetPage({ searchParams }: PasswordResetPageProps) {
  return <PasswordResetForm searchParams={await searchParams} />;
}
