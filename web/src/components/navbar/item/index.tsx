import { ItemProps } from "document/types/navbarTypes";
import Link from "next/link";
import styles from "./index.module.css";

export default function Item({
  item,
  Icon,
  route,
  selected = false,
}: ItemProps) {
  return (
    <Link
      href={route}
      className={styles.item + " " + (selected ? styles.item_selected : "")}
    >
      <Icon />
      <span>{item}</span>
    </Link>
  );
}
