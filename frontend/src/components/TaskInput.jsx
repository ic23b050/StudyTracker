function TaskInput({ input, setInput, onAdd, priority, setPriority }) {
  console.log("TaskInput priority:", priority);
  return (
    <div className="input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button onClick={onAdd}>Add Task</button>
    </div>
  );
}

export default TaskInput;
