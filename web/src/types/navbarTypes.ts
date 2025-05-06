import { IconType } from "react-icons/lib";

export interface ItemProps {
  item: string | React.ReactNode;
  Icon: IconType;
  route: string;
  selected?: boolean;
}