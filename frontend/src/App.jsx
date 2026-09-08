import useTasks from "./hooks/useTasks";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskSection from "./components/TaskSection";
import Login from "./components/Login";
import useAuth from "./hooks/useAuth";
import Register from "./components/Register";
import React from "react";

function App() {
  const {
    token,
    handleLogin,
    handleLogout,
    error: autherror,
    userName,
    handleRegistration,
  } = useAuth();
  const {
    tasks,
    input,
    setInput,
    handleAdd,
    handleToggle,
    handleDelete,
    loading,
    error: taskError,
    priority,
    setPriority,
    handlePriorityChange,
    dueDate,
    setDueDate,
    handleDueDateChange,
  } = useTasks(token);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const openTasks = totalTasks - completedTasks;
  const [showRegister, setShowRegister] = React.useState(false);

  return (
    <div className="app">
      <Header onLogout={handleLogout} userName={userName} />
      {token ? (
        <>
          <Stats
            total={totalTasks}
            completed={completedTasks}
            open={openTasks}
          />

          <TaskSection
            tasks={tasks}
            input={input}
            setInput={setInput}
            onAdd={handleAdd}
            onToggle={handleToggle}
            onDelete={handleDelete}
            loading={loading}
            error={taskError}
            priority={priority}
            setPriority={setPriority}
            handlePriorityChange={handlePriorityChange}
            onPriorityChange={handlePriorityChange}
            dueDate={dueDate}
            setDueDate={setDueDate}
            handleDueDateChange={handleDueDateChange}
            onDueDateChange={handleDueDateChange}
          />
        </>
      ) : (
        <>
          <button onClick={() => setShowRegister((prev) => !prev)}>
            {showRegister ? "Go to Login" : "Go to Register"}
          </button>

          {showRegister ? (
            <Register onRegister={handleRegistration} error={autherror} />
          ) : (
            <Login onLogin={handleLogin} error={autherror} />
          )}
        </>
      )}
    </div>
  );
}
export default App;
