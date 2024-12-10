import { Permission, ROLES, User } from "@/entities/User";

export default function hasAuthorization(user: User | null, authorization: Permission): boolean {
  if (!user) return false;
  return (ROLES[user.role] as readonly Permission[]).includes(authorization);
}
