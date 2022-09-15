package com.a606.api.controller;

import com.a606.api.dto.NFTDto;
import com.a606.api.dto.UserDto;
import com.a606.api.service.UserService;
import com.a606.db.entity.NFT;
import com.a606.db.entity.Profile;
import com.a606.db.entity.User;
import com.a606.db.entity.UserPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("api/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PostMapping("user")
    @ApiOperation(value = "로그인, 회원 가입", notes = "지갑주소가 있으면 로그인 없으면 회원가입")
//    @ApiResponse({
//            @ApiResponse(code = 201, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
    public ResponseEntity<?> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) @Valid UserDto.LoginRequest loginInfo, Model model, HttpSession session,
                                   HttpServletResponse response) {
        String userWallet = loginInfo.getWallet();

        User user = userService.getUserPageByWallet(userWallet);
        if(user == null) {
            //user가 없으면
            user = userService.createUser(loginInfo);
            session.setAttribute("User", user);
            Cookie cookie = new Cookie("user", user.getWallet());
            cookie.setPath("/");
            cookie.setMaxAge(24*60*60*365);
            response.addCookie(cookie);
            return new ResponseEntity<UserDto.Info>(new UserDto.Info(user), HttpStatus.CREATED);

        } else {
            //user가 있으면
            session.setAttribute("User", user);
            Cookie cookie = new Cookie("user", user.getWallet());
            cookie.setPath("/");
            cookie.setMaxAge(24*60*60*365);
            response.addCookie(cookie);
            return new ResponseEntity<>(new UserDto.Info(user), HttpStatus.OK);
        }
    }

    @PostMapping("user/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃을 한다")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @GetMapping("user/{userId}")
    @ApiOperation(value = "userId로 마이페이지 조회", notes = "userId로 마이페이지 조회")
    public ResponseEntity<List<NFTDto>> myPage(@PathVariable long userId) {
        UserPage userPage = userService.getUserPageById(userId);
        List<NFTDto> list = new ArrayList<>();
        for(int i = 0; i < userPage.getNfts().size(); i++) {
            NFTDto nftDto = new NFTDto();
            NFT nft = userPage.getNfts().get(i);

            nftDto.setId(nft.getId());
            nftDto.setTokenURI(nft.getTokenURI());
            nftDto.setSaled(nft.is_saled());
            nftDto.setName(nft.getName());
            nftDto.setLikeCount(nft.getLike_count());

            list.add(nftDto);
        }
        return new ResponseEntity<List<NFTDto>>(list, HttpStatus.OK);
    }

    @GetMapping("user/profile/{userId}")
    @ApiOperation(value = "userId로 프로필 조회", notes = "userId로 프로필 조회")
    public ResponseEntity<NFTDto> getProfile(@PathVariable long userId) {
        Profile profile = userService.getProfileById(userId);

        NFTDto nftDto = new NFTDto();

        nftDto.setId(profile.getNft().getId());
        nftDto.setTokenURI(profile.getNft().getTokenURI());
        nftDto.setSaled(profile.getNft().is_saled());
        nftDto.setName(profile.getNft().getName());
        nftDto.setLikeCount(profile.getNft().getLike_count());

        return new ResponseEntity<NFTDto>(nftDto, HttpStatus.OK);
    }

    //updateProfile
    @PostMapping("user/change/profile")
    public ResponseEntity<NFTDto> updateProfile(
            @RequestBody @ApiParam(value = "프로필 변경", required = true) @Valid UserDto.updateProfileRequest updateProfileRequest
    ) {
        Profile profile = userService.updateProfile(updateProfileRequest.getUserId(), updateProfileRequest.getNftId());

        NFTDto nftDto = new NFTDto();

        nftDto.setId(profile.getNft().getId());
        nftDto.setTokenURI(profile.getNft().getTokenURI());
        nftDto.setSaled(profile.getNft().is_saled());
        nftDto.setName(profile.getNft().getName());
        nftDto.setLikeCount(profile.getNft().getLike_count());

        return new ResponseEntity<NFTDto>(nftDto, HttpStatus.OK);
    }

    //updateNickname
    @PostMapping("user/change/nickname")
    public ResponseEntity<String> updateNickname(
            @RequestBody @ApiParam(value = "프로필 변경", required = true) @Valid UserDto.updateNicknameRequest updateNicknameRequest
    ) {
        return new ResponseEntity<String>(
                userService.updateNickname(updateNicknameRequest.getUserId(), updateNicknameRequest.getNickname()), HttpStatus.OK);
    }
}
