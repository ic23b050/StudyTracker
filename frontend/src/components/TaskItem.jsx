function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div>
      <h3
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </h3>

      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
