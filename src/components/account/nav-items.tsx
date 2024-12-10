import { ChartBar, CircleUser, LogOut, Upload } from "lucide-react";

const options = [
  { id: 0, href: "/user/account", icon: <CircleUser />, label: "Minhas fotos" },
  { id: 1, href: "/user/account/dashboard", icon: <ChartBar />, label: "Estatísticas" },
  { id: 2, href: "/user/account/upload", icon: <Upload />, label: "Envie sua foto" },
  { id: 3, href: "/api/auth/signout", icon: <LogOut />, label: "Sair" },
] as const;

export default options;
