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
}) {
  return (
    <div className="task-section">
      <TaskInput input={input} setInput={setInput} onAdd={onAdd} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}

export default TaskSection;
