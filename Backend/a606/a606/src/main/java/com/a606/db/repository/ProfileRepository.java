package com.a606.db.repository;

import com.a606.db.entity.Profile;
import com.a606.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, User> {
    Optional<Profile> findByUser(User user);
}
