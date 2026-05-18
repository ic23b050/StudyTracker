import { useEffect, useState } from "react";
import API from "./services/api.js";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        console.log(res.data);
        setTasks(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Study Tracker</h1>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
