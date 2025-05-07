import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from "./index.module.css";
import {
  ModalConfirmState,
  ModalProgressProcessProps,
} from "document/types/componentsTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProgressProcesses } from "document/services/progressProcessServices";
import Loading from "../loading";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IoMdAdd } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { ProgressProcess } from "document/types/progressProcessTypes";
import ModalConfirm from "../modalConfirm";
import { useDeleteProgress } from "document/hooks/useDeleteProgress";
import { useCreateProgress } from "document/hooks/useCreateProgress";
import { useUpdateProgress } from "document/hooks/useUpdateProgress";
import ModalAddProgressProcess from "./modalAddProgress";

export default function ModalProgressProcess({
  open,
  setOpen,
  process,
}: ModalProgressProcessProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteProgress();
  const createMutation = useCreateProgress();
  const updateMutation = useUpdateProgress();

  const [modalConfirm, setModalConfirm] = React.useState<ModalConfirmState>({
    open: false,
    process: null,
  });
  const [modalAddProgress, setModalAddProgress] = React.useState(false);
  const [progressProcessToEdit, setProgressProcessToEdit] =
    React.useState<ProgressProcess>();

  const handleClose = () => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["progress_processes"] });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["progress_processes"],
    queryFn: () => getProgressProcesses(process?.id || 1),
  });

  const handleCloseModalConfirm = () => {
    setModalConfirm({ open: false, process: null });
  };

  const handleDelete = (id: number) => {
    handleCloseModalConfirm();
    deleteMutation.mutate(id);
  };

  const ActionsComponent = React.useCallback(
    (progressProcess: ProgressProcess) => {
      return (
        <section className={style.rowActions}>
          <Tooltip
            title="Editar andamento"
            onClick={() => {
              setProgressProcessToEdit(progressProcess);
              setModalAddProgress(true);
            }}
          >
            <BiSolidEdit />
          </Tooltip>
          <Tooltip
            title="Deletar andamento"
            onClick={() => setModalConfirm({ open: true, process: progressProcess })}
          >
            <FaDeleteLeft />
          </Tooltip>
        </section>
      );
    },
    [setModalAddProgress, setModalConfirm, setProgressProcessToEdit]
  );

  const TableComponent = React.useMemo(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (!data) {
      return <p>Erro ao carregar andamentos do processo!</p>;
    }
    if (!data.length) {
      return <h3 style={{marginBottom: '1em'}}>Nenhum andamento encontrado!</h3>;
    }

    return (
      <TableContainer component={Paper} className={style.tableContainer}>
        <Table className={style.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Descrição</TableCell>
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
                  {format(parseISO(row.date), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{ActionsComponent(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [ActionsComponent, data, isLoading]);

  if (process) {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={style.modal}>
            <header>
              <h2>
                Andamentos do Processo {process.process_number} -{" "}
                {process.customer}
              </h2>
              <Button
                variant="contained"
                onClick={handleClose}
                className={style.modalButton}
                color="error"
              >
                Sair
              </Button>
            </header>
            <section>{process.description}</section>
            {isLoading ? <Loading /> : TableComponent}
            {!isLoading && (
              <Button
                variant="contained"
                endIcon={<IoMdAdd />}
                onClick={() => setModalAddProgress(true)}
              >
                Novo andamento
              </Button>
            )}
          </Box>
        </Modal>
        <ModalConfirm
          open={modalConfirm.open}
          setOpen={(open) => setModalConfirm({ ...modalConfirm, open })}
          processOrProgress={modalConfirm.process}
          handleSubmit={(process) => handleDelete(process.id)}
        />
        <ModalAddProgressProcess
          open={modalAddProgress}
          setOpen={(bool) => {
            setModalAddProgress(bool);
            if (!bool) {
              setProgressProcessToEdit(undefined);
            }
          }}
          handleSubmitProcess={(data, id) => {
            if (!id) {
              createMutation.mutate({ ...data, process_id: process.id });
            } else {
              updateMutation.mutate({
                id,
                data: { ...data, process_id: process.id },
              });
            }
          }}
          progressToEdit={progressProcessToEdit}
        />
      </>
    );
  }
}
