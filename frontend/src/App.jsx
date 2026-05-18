import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks, input, setInput, handleAdd, handleToggle, handleDelete } =
    useTasks();

  return (
    <div>
      <h1>Study Tracker</h1>

      <TaskInput input={input} setInput={setInput} onAdd={handleAdd} />

      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
