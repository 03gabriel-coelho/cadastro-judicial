import React from "react";
import styles from "./index.module.css";
import { RiFileShieldFill } from "react-icons/ri";
import Item from "./item";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>Gestão de processos judiciais</h2>
      <Item Icon={RiFileShieldFill} item="Processos" route="/" selected/>
    </nav>
  );
}
