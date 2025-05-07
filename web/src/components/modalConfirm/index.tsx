import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from "./index.module.css";
import ModalConfirmProps from "document/types/componentsTypes";
import { Process } from "document/types/processTypes";
import { ProgressProcess } from "document/types/progressProcessTypes";

export default function ModalConfirm({
  open,
  setOpen,
  processOrProgress,
  handleSubmit,
}: ModalConfirmProps) {
  const handleClose = () => setOpen(false);

  if (process)
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={style.modal}>
            <h2>
              Você tem certeza que deseja deletar o{" "}
              {(processOrProgress as Process)?.process_number
                ? "processo"
                : "andamento"}{" "}
              {(processOrProgress as Process)?.process_number || ""} ?
            </h2>
            <footer className={style.modalFooter}>
              <Button
                variant="outlined"
                onClick={handleClose}
                className={style.modalButton}
                color="success"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleSubmit(processOrProgress as ProgressProcess | Process)
                }
                className={style.modalButton}
                color="error"
              >
                Deletar
              </Button>
            </footer>
          </Box>
        </Modal>
      </div>
    );
}
