import React from "react";
import styles from "./index.module.css";
import { AiFillAccountBook } from "react-icons/ai";
import Item from "./item";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>Gestão de processos judiciais</h2>
      <Item Icon={AiFillAccountBook} item="Processos" route="/" selected/>
    </nav>
  );
}
