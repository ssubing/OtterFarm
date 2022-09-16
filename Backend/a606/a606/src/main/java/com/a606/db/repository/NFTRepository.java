package com.a606.db.repository;

import com.a606.db.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NFTRepository extends JpaRepository<NFT, Long> {
    Optional<NFT> findById(long nftId);

    Optional<NFT> findByTokenId(String tokenId);
}
