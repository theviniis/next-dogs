import { ButtonProps } from "../ui/button";
import options from "./nav-items";

export type MenuItemProps = ButtonProps & {
  option: (typeof options)[number];
  isActive: boolean;
};

export type MenuProps = {
  options: typeof options;
  pathname: string;
};
