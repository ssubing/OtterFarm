package com.a606.api.service;

import com.a606.api.dto.UserDto;
import com.a606.db.entity.NFT;
import com.a606.db.entity.Profile;
import com.a606.db.entity.User;
import com.a606.db.entity.UserPage;
import com.a606.db.repository.NFTRepository;
import com.a606.db.repository.ProfileRepository;
import com.a606.db.repository.UserPageRepository;
import com.a606.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private NFTRepository nftRepository;
    private UserPageRepository userPageRepository;
    private ProfileRepository profileRepository;



    @Override
    public User createUser(UserDto.LoginRequest loginRequest) {
        User user = new User();
        user.setNickname("Unknown");
        user.setWallet(loginRequest.getWallet());
        user.setGamePoint(0l);
        user.setCreatedDate(LocalDateTime.now());
        user.setLastModifiedDate(LocalDateTime.now());

        userRepository.save(user);
        return user;
    }

    @Override
    public UserPage getUserPageById(long userId) {
        User user = userRepository.findById(userId).get();
        UserPage userPage = userPageRepository.findByUser(user).get();
        return userPage;
    }

    @Override
    public Profile getProfileById(long userId) {
        User user = userRepository.findById(userId).get();
        Profile profile = profileRepository.findByUser(user).get();
        return profile;
    }

    @Override
    public User getUserPageByWallet(String userWallet) {
        User user = userRepository.findByWallet(userWallet).get();
        return user;
    }

    @Override
    public Profile updateProfile(long userId, long nftId) {
        User user = userRepository.findById(userId).get();
        NFT nft = nftRepository.findById(nftId).get();
        Profile profile = profileRepository.findById(user).get();
        profile.setUser(user);
        profile.setNft(nft);
        profileRepository.save(profile);

        return profile;
    }

    @Override
    public String updateNickname(long userId, String nickname) {
        User user = userRepository.findById(userId).get();
        user.setNickname(nickname);
        userRepository.save(user);

        return user.getNickname();
    }
}
