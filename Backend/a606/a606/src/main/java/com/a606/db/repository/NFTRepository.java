package com.a606.db.repository;

import com.a606.db.entity.NFT;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NFTRepository extends JpaRepository<NFT, Long> {
    List<NFT> findAllById(Long id);
}
