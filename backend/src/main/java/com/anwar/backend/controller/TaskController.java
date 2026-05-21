package com.anwar.backend.controller;

import com.anwar.backend.entity.Task;
import com.anwar.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.anwar.backend.enums.Priority;

import java.sql.Date;
import java.util.List;
import java.util.Map;




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

    @PutMapping("/{id}/priority")
    public ResponseEntity<Task> updatePriority(
        @PathVariable Long id,
        @RequestBody Map<String, String> body
    ) {
    String priority = body.get("priority");

    return taskRepository.findById(id)
            .map(task -> {
                task.setPriority(Priority.valueOf(priority));
                return ResponseEntity.ok(taskRepository.save(task));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/dueDate")
    public ResponseEntity<Task> updateDueDate(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String dueDate = body.get("dueDate");

        return taskRepository.findById(id)
                .map(task -> {
                    if (dueDate == null || dueDate.isEmpty()) {
                        task.setDueDate(null);
                    } else {
                        task.setDueDate(Date.valueOf(dueDate));
                    }
                    return ResponseEntity.ok(taskRepository.save(task));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
