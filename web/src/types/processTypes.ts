export type Response = {
  message?: string;
  error?: string;
};

export interface State {
  id: number;
  federal_state: string;
  name_state: string;
  active: number;
}

export interface Process {
  id: number;
  created_at: string;
  updated_at: string;
  process_number: string;
  opening_date: string;
  description: string;
  customer: string;
  attorney: string;
  state_id: number;
  state: State;
}