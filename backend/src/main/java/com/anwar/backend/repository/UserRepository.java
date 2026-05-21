package com.anwar.backend.repository;

import org.springframework.stereotype.Repository;
import com.anwar.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
