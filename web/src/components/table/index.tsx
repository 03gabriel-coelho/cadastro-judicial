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
import ModalConfirm from "../modalConfirm";
import { ModalConfirmState } from "document/types/tableTypes";
import { useDeleteProcess } from "document/hooks/useDeleteProcess";

export default function BasicTable() {
  const deleteMutation = useDeleteProcess();

  const [modalConfirm, setModalConfirm] = React.useState<ModalConfirmState>({
    open: false,
    process: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["processes"],
    queryFn: getProcesses,
  });

  const handleCloseModalConfirm = () => {
    setModalConfirm({ open: false, process: null });
  };

  const handleDelete = (id: number) => {
    handleCloseModalConfirm();
    deleteMutation.mutate(id);
  };

  const ActionsComponent = (process: Process) => {
    return (
      <section className={style.rowActions}>
        <Tooltip title="Visualizar andamentos">
          <MdPreview />
        </Tooltip>
        <Tooltip title="Editar processo">
          <BiSolidEdit />
        </Tooltip>
        <Tooltip
          title="Deletar processo"
          onClick={() => setModalConfirm({ open: true, process })}
        >
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
      {!isLoading ? <h2>Processos recentes</h2> : null}
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
      <ModalConfirm
        open={modalConfirm.open}
        setOpen={(open) => setModalConfirm({ ...modalConfirm, open })}
        process={modalConfirm.process}
        handleSubmit={(process) => handleDelete(process.id)}
      />
    </div>
  );
}
