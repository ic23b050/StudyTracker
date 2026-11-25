package com.anwar.backend.repository;

import com.anwar.backend.entity.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserUsername(String username);

    Optional<Task> findByIdAndUserUsername(
        Long id,
        String username
);
}