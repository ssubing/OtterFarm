package com.a606.db.repository;

import com.a606.db.entity.User;
import com.a606.db.entity.UserPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPageRepository extends JpaRepository<UserPage, User> {
    Optional<UserPage> findByUser(User user);
}
