"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./index.module.css";
import { Button, Tooltip } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getProcesses } from "document/services/processServices";
import { useMemo } from "react";
import Loading from "../loading";
import { Process } from "document/types/processTypes";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdPreview } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";

export default function BasicTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["processes"],
    queryFn: getProcesses,
  });

  const ActionsComponent = (process: Process) => {
    return (
      <section className={style.rowActions}>
        <Tooltip title="Visualizar andamentos">
          <MdPreview />
        </Tooltip>
        <Tooltip title="Editar processo">
          <BiSolidEdit />
        </Tooltip>
        <Tooltip title="Deletar processo">
          <FaDeleteLeft />
        </Tooltip>
      </section>
    );
  };

  const TableComponent = useMemo(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (!data) {
      return <p>Erro ao carregar processos!</p>;
    }
    if (!data.length) {
      return null;
    }

    return (
      <TableContainer component={Paper} className={style.tableContainer}>
        <Table className={style.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Advogado(a)</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.process_number}
                </TableCell>
                <TableCell>{row.state.federal_state}</TableCell>
                <TableCell>{row.opening_date}</TableCell>
                <TableCell className={style.rowDescription}>
                  {row.description}
                </TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.attorney}</TableCell>
                <TableCell>{ActionsComponent(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [data, isLoading]);

  return (
    <div className={style.tableContent}>
      <h2>Processos recentes</h2>
      {TableComponent}
      <footer className={style.footer}>
        {!data?.length && !isLoading ? (
          <p className={style.emptyText}>Nenhum processo encontrado!</p>
        ) : null}
        {!isLoading ? (
          <Button variant="contained" endIcon={<IoMdAdd />}>
            Novo processo
          </Button>
        ) : null}
      </footer>
    </div>
  );
}
