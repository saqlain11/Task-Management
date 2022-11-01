import { Task } from "model";
import { useCallback, useMemo } from "react";

const useDependencies = (task: Task[]) => {
  const findCyclicDependencies = (definitions, identifier) => {
    const stack = [];

    // Internal search function.
    const search = (currentIdentifier) => {
      // If we have visited this node, return whether or not it is the one we
      // are looking for.
      if (stack.indexOf(currentIdentifier) !== -1) {
        return currentIdentifier === identifier;
      }

      stack.push(currentIdentifier);

      // Check all of the child nodes to see if they contain the node we are
      // looking for.
      const found = definitions[currentIdentifier]?.some(search);

      // Remove the current node from the stack if it's children do not
      // contain the node we are looking for.
      if (!found) {
        stack.splice(stack.indexOf(currentIdentifier), 1);
      }

      return found;
    };

    const cycle = search(identifier) ? stack.concat(identifier) : [];

    // If there isn't a cyclic dependency then we return an empty array,
    // otherwise we return the stack.
    return cycle;
  };

  const connections = useMemo(() => {
    return task.reduce((connections, task) => {
      connections[task.id] = task.subTask;
      return connections;
    }, {});
  }, [task]);

  const checkCircularDependency = useCallback(
    (taskID: number) => {
      const newTask = task.length + 1;
      connections[newTask] = [];
      if (connections[taskID]) {
        connections[taskID] = [...connections[taskID], newTask];
      } else {
        connections[taskID] = [newTask];
      }
      const result = findCyclicDependencies(connections, taskID);
      return !!result.length;
    },
    [connections]
  );

  return {
    connections,
    checkCircularDependency,
  };
};
export default useDependencies;
