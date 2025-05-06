import { Process } from "./processTypes";

export type ModalConfirmState = {
  open: boolean;
  process: Process | null;
}