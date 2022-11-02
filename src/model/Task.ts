export type status = "IN PROGRESS" | "DONE" | "COMPLETE";
export interface Task {
  id?: number;
  taskName: string;
  status: status;
  description: string;
  subTask?: number[];
}
