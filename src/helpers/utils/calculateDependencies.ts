import { TaskListProps } from "components";

type dependencies = {
  total: number;
  done: number;
  complete: number;
};

const calculateDependencies = (subTask: TaskListProps[]): dependencies => {
  return subTask.reduce(
    (allCount, task) => {
      if (task.status === "COMPLETE") {
        allCount.complete += 1;
      } else if (task.status === "DONE") {
        allCount.done += 1;
      }
      return allCount;
    },
    { total: subTask.length, done: 0, complete: 0 }
  );
};
export default calculateDependencies;
