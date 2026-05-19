function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </h3>
      <div className="task-action">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
