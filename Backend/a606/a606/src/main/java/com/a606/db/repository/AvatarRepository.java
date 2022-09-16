package com.a606.db.repository;

import com.a606.db.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    Avatar findByUserId(long userId);
}
