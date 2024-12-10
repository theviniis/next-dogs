function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-[var(--header-height)] min-h-dvh">
      <div className="bg-[url('/login.jpg')] bg-cover bg-no-repeat"></div>
      <div className="place-self-center">{children}</div>
    </div>
  );
}

export default AuthLayout;
