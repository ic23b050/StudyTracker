import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onPriorityChange,
  onDueDateChange,
}) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onPriorityChange={onPriorityChange}
            onDueDateChange={onDueDateChange}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
