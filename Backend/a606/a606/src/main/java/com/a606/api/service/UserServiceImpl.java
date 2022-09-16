package com.a606.api.service;

import com.a606.api.dto.UserDto;
import com.a606.db.entity.NFT;
import com.a606.db.entity.User;
import com.a606.db.repository.NFTRepository;
import com.a606.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private NFTRepository nftRepository;



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
    public List<NFT> getUserPageById(long userId) {
        User user = userRepository.findById(userId).get();
        // web3를 통해서 solidity랑 통신해서 보유한 NFT의 tokenID를 얻어서
        // DB에서 tokenID로 검색한 NFT들을 List에 담아서 반환
        return null;
    }

    @Override
    public NFT getProfileById(long userId) {
        User user = userRepository.findById(userId).get();
        // web3를 통해서 solidity랑 통신해서 보유한 NFT의 tokenID를 얻어서
        // DB에서 tokenID로 검색한 NFT들 중에서 isProfile이 true면 반환
        return null;
    }

    @Override
    public User getUserPageByWallet(String userWallet) {
        User user = userRepository.findByWallet(userWallet).get();
        return user;
    }

    @Override
    public NFT updateProfile(long userId, String nftTokenId) {
        User user = userRepository.findById(userId).get();
        NFT nft = nftRepository.findByTokenId(nftTokenId).get();
        // web3를 통해서 solidity랑 통신해서 보유한 NFT의 tokenID를 얻어서
        // 위 nft를 보유중이면
        nft.set_profile(true);

        return nft;
    }

    @Override
    public String updateNickname(long userId, String nickname) {
        User user = userRepository.findById(userId).get();
        user.setNickname(nickname);
        userRepository.save(user);

        return user.getNickname();
    }
}
