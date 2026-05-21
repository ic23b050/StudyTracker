import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

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
      priority: priority,
      dueDate: dueDate,
    };

    // Update UI immediately
    setTasks((prev) => [...prev, tempTask]);
    setInput("");

    //send request to backend
    API.post("/tasks", { title: input, priority: priority, dueDate: dueDate })
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
    let previousTask;

    // optimistic update + capture old value
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          previousTask = t; // store original
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );

    API.put(`/tasks/${id}`).catch(() => {
      // rollback using exact previous value
      setTasks((prev) => prev.map((t) => (t.id === id ? previousTask : t)));
    });
  };

  const handleDelete = (id) => {
    const previousTasks = tasks;

    // 1. instant remove
    setTasks((prev) => prev.filter((t) => t.id !== id));

    // 2. API call
    API.delete(`/tasks/${id}`).catch(() => {
      // rollback if error
      setTasks(previousTasks);
    });
  };

  const handlePriorityChange = (id, newPriority) => {
    let previousTask;

    // optimistic update + capture old value
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          previousTask = t;
          return { ...t, priority: newPriority };
        }
        return t;
      }),
    );

    API.put(`/tasks/${id}/priority`, { priority: newPriority }).catch(() => {
      // rollback if error
      setTasks((prev) => prev.map((t) => (t.id === id ? previousTask : t)));
    });
  };

  const handleDueDateChange = (id, newDueDate) => {
    let previousTask;

    // split date to remove time part
    const dateWithoutTime = newDueDate ? newDueDate.split("T")[0] : "";

    // optimistic update + capture old value
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          previousTask = t;
          return { ...t, dueDate: dateWithoutTime };
        }
        return t;
      }),
    );

    // API call
    API.put(`/tasks/${id}/dueDate`, { dueDate: dateWithoutTime }).catch(() => {
      // rollback if error
      setTasks((prev) => prev.map((t) => (t.id === id ? previousTask : t)));
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
    priority,
    setPriority,
    handlePriorityChange,
    dueDate,
    setDueDate,
    handleDueDateChange,
  };
}
