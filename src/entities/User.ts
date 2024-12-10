export const ROLES = {
  admin: ["delete:photos"],
  user: ["view:photos", "delete:ownPhotos", "post:comments"],
} as const;

export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

export interface User {
  id: string;
  email: string;
  nome: string;
  username: string;
  role: Role;
}
