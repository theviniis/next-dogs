import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/entities/User";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import avatar from "../../../public/dogs-avatar.jpeg";
import { ProfileButton, ProfileButtonAvatar, ProfileButtonIcon } from "../ui/profile-button";

type UserNavProps = {
  user: User;
};

export async function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileButton>
          <ProfileButtonAvatar src={avatar} alt="User profile picture" />
          <ProfileButtonIcon />
        </ProfileButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{user.nome}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/user/account" className="no-underline">
              Perfil
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/api/auth/signout" className="not-prose no-underline">
            Sair
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
