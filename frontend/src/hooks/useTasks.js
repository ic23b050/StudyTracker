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

    const tempTask = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    // Update UI immediately
    setTasks((prev) => [...prev, tempTask]);
    setInput("");

    //send request to backend
    API.post("/tasks", { title: input })
      .then((res) => {
        // replace tempTask with actual task from backend
        setTasks((prev) =>
          prev.map((t) => (t.id === tempTask.id ? res.data : t)),
        );
      })
      .catch((err) => {
        //rollback
        setTasks((prev) => prev.filter((t) => t.id !== tempTask.id));
        setError("Failed to add task");
        console.log(err);
      });
  };

  const handleToggle = (id) => {
    // 1. optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

    // 2. API call
    API.put(`/tasks/${id}`).catch(() => {
      // rollback if failed
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    });
  };

  const handleDelete = (id) => {
    const backup = tasks;

    // 1. instant remove
    setTasks((prev) => prev.filter((t) => t.id !== id));

    // 2. API call
    API.delete(`/tasks/${id}`).catch(() => {
      // rollback if error
      setTasks(backup);
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
