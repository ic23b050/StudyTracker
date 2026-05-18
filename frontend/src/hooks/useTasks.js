import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    setLoading(true);
    setError(null);

    API.get("/tasks")
      .then((res) => {
        setTasks(res.data || []);
      })
      .catch((err) => {
        setError("Failed to load tasks");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;

    setError(null);

    API.post("/tasks", { title: input })
      .then(() => {
        setInput("");
        fetchTasks();
      })
      .catch((err) => {
        setError("Failed to add task");
        console.log(err);
      });
  };

  const handleToggle = (id) => {
    API.put(`/tasks/${id}`)
      .then(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        );
      })
      .catch((err) => {
        setError("Something went wrong");
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    API.delete(`/tasks/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => {
        setError("Something went wrong");
      });
  };

  return {
    tasks,
    input,
    setInput,
    handleAdd,
    handleToggle,
    handleDelete,
    loading,
    error,
  };
}
