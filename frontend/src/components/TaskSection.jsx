import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function TaskSection({
  tasks,
  input,
  setInput,
  onAdd,
  onToggle,
  onDelete,
  loading,
  error,
  priority,
  setPriority,
  handlePriorityChange,
  onPriorityChange,
  dueDate,
  setDueDate,
  handleDueDateChange,
  onDueDateChange,
}) {
  return (
    <div className="task-section">
      <TaskInput
        input={input}
        setInput={setInput}
        onAdd={onAdd}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskList
        tasks={tasks}
        onToggle={onToggle}
        onDelete={onDelete}
        onPriorityChange={onPriorityChange}
        onDueDateChange={onDueDateChange}
      />
    </div>
  );
}

export default TaskSection;
