package com.a606.api.service;

import com.a606.api.dto.UserDto;
import com.a606.db.entity.Profile;
import com.a606.db.entity.User;
import com.a606.db.entity.UserPage;
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
    UserPage getUserPageById(long userId);

    @Transactional
    Profile getProfileById(long userId);

    @Transactional
    Profile updateProfile(long userId, long nftId);

    @Transactional
    String updateNickname(long userId, String nickname);

}
