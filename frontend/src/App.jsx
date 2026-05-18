import useTasks from "./hooks/useTasks";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskSection from "./components/TaskSection";

function App() {
  const {
    tasks,
    input,
    setInput,
    handleAdd,
    handleToggle,
    handleDelete,
    loading,
    error,
  } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const openTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <Header />

      <Stats total={totalTasks} completed={completedTasks} open={openTasks} />

      <TaskSection
        tasks={tasks}
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
        onToggle={handleToggle}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />
    </div>
  );
}
export default App;
