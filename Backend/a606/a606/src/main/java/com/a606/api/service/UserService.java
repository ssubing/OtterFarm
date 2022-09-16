package com.a606.api.service;

import com.a606.api.dto.UserDto;
import com.a606.db.entity.NFT;
import com.a606.db.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public interface UserService {

    @Transactional
    User createUser(UserDto.LoginRequest loginRequest);

    @Transactional
    User getUserPageByWallet(String userWallet);

    @Transactional
    List<NFT> getUserPageById(long userId);

    @Transactional
    NFT getProfileById(long userId);

    @Transactional
    NFT updateProfile(long userId, String nftTokenId);

    @Transactional
    String updateNickname(long userId, String nickname);

}
