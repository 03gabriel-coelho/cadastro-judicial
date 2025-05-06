"use client";

import Navbar from "document/components/navbar";
import style from "./page.module.css";
import BasicTable from "document/components/table";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "document/services/statesServices";
import { useApp } from "./appContext";
import { useEffect } from "react";

export default function Home() {
  const { setStates } = useApp();

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });
  
  useEffect(() => {
    if (states) {
      setStates(states);
    }
  }, [setStates, states]);

  return (
    <div className={style.container}>
      <Navbar />
      <BasicTable />
    </div>
  );
}
