package com.anwar.backend.controller;

import com.anwar.backend.entity.Task;
import com.anwar.backend.repository.TaskRepository;
import com.anwar.backend.repository.UserRepository;
import com.anwar.backend.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

     private String getCurrentUsername() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping
    public List<Task> getAllTasks() {
        
        return taskRepository.findByUserUsername(getCurrentUsername());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

    User user = userRepository.findByUsername(getCurrentUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        if (task.getCompleted() == null) {
        task.setCompleted(false);
    }
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> toggleCompletion(@PathVariable Long id) {

    return taskRepository.findByIdAndUserUsername(id, getCurrentUsername())
        .map(task -> {
            task.setCompleted(!task.getCompleted());
            return ResponseEntity.ok(taskRepository.save(task));
        })
        .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    return taskRepository.findByIdAndUserUsername(id, getCurrentUsername())
        .map(task -> {
            taskRepository.delete(task);
            return ResponseEntity.noContent().<Void>build();
        })
        .orElse(ResponseEntity.notFound().build());
}

    @PutMapping("/{id}/priority")
    public ResponseEntity<Task> updatePriority(
        @PathVariable Long id,
        @RequestBody Map<String, String> body
    ) {
    String priority = body.get("priority");

    return taskRepository.findByIdAndUserUsername(id, getCurrentUsername())
            .map(task -> {
                task.setPriority(Priority.valueOf(priority));
                return ResponseEntity.ok(taskRepository.save(task));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/dueDate")
    public ResponseEntity<Task> updateDueDate(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String dueDate = body.get("dueDate");

        return taskRepository.findByIdAndUserUsername(id, getCurrentUsername())
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
