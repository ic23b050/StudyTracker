function TaskInput({ input, setInput, onAdd }) {
  return (
    <div className="input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />

      <button onClick={onAdd}>Add Task</button>
    </div>
  );
}

export default TaskInput;
