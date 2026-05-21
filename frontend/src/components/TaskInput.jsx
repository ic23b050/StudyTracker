function TaskInput({
  input,
  setInput,
  onAdd,
  priority,
  setPriority,
  dueDate,
  setDueDate,
}) {
  return (
    <div className="input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <input
        type="date"
        value={dueDate || ""}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={onAdd}>Add Task</button>
    </div>
  );
}

export default TaskInput;
