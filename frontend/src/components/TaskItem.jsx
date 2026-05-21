import priority from "../hooks/useTasks";
import setPriority from "../hooks/useTasks";

function TaskItem({ task, onToggle, onDelete, onPriorityChange }) {
  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${task.priority ? task.priority.toLowerCase() : ""}`}
    >
      <h3
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </h3>
      <div className="task-action">
        <select
          value={task.priority || "MEDIUM"}
          onChange={(e) => onPriorityChange(task.id, e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
