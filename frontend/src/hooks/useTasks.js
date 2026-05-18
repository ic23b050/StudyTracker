import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const fetchTasks = () => {
    API.get("/tasks")
      .then((res) => {
        setTasks(res.data || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    API.post("/tasks", { title: input }).then(() => {
      setInput("");
      fetchTasks();
    });
  };

  const handleToggle = (id) => {
    API.put(`/tasks/${id}`).then(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    });
  };

  const handleDelete = (id) => {
    API.delete(`/tasks/${id}`).then(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });
  };

  return {
    tasks,
    input,
    setInput,
    handleAdd,
    handleToggle,
    handleDelete,
  };
}
