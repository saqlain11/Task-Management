export default interface TaskListProps {
  id: number;
  taskName: string;
  description: string;
  status: string;
  subTask?: number[];
}
