'use client';

import Navbar from "document/components/navbar";
import style from "./page.module.css";
import BasicTable from "document/components/table";

export default function Home() {
  return (
    <div className={style.container}>
      <Navbar />
      <BasicTable />
    </div>
  );
}
