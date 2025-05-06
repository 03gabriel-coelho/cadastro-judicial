import { Process } from "./processTypes";

export default interface ModalConfirmProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  process: Process | null;
  handleSubmit: (process: Process) => void;
}