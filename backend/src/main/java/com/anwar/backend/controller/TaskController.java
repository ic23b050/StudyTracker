package com.anwar.backend.controller;

import com.anwar.backend.entity.Task;
import com.anwar.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        if (task.getCompleted() == null) {
        task.setCompleted(false);
    }
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
public ResponseEntity<Task> toggleCompletion(@PathVariable Long id) {

    return taskRepository.findById(id)
        .map(task -> {
            task.setCompleted(!task.getCompleted());
            return ResponseEntity.ok(taskRepository.save(task));
        })
        .orElse(ResponseEntity.notFound().build());
}

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}