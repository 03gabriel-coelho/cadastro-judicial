import * as React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./index.module.css";
import {
  ModalAddProgressProcessProps,
  ProgressProcessFormValues,
  progressProcessSchema,
} from "document/types/componentsTypes";

export default function ModalAddProgressProcess({
  open,
  setOpen,
  handleSubmitProcess,
  progressToEdit,
}: ModalAddProgressProcessProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProgressProcessFormValues>({
    resolver: zodResolver(progressProcessSchema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: ProgressProcessFormValues) => {
    if (progressToEdit) {
      handleSubmitProcess(data, progressToEdit.id);
    } else {
      handleSubmitProcess(data);
    }
    handleClose();
  };

  React.useEffect(() => {
    if (progressToEdit) {
      reset({
        description: progressToEdit.description,
        date: progressToEdit.date,
      });
    } else {
      reset();
      setValue("description", "");
      setValue("date", "");
    }
  }, [progressToEdit, reset, open, setValue]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-process">
      <Box className={style.modal}>
        <h2>{progressToEdit ? "Editar Andamento" : "Adicionar Novo Andamento"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <section className={style.formContainer}>
            <TextField
              label="Data de Abertura"
              type="date"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Descrição"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </section>

          <footer className={style.modalFooter}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {progressToEdit ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </footer>
        </form>
      </Box>
    </Modal>
  );
}
