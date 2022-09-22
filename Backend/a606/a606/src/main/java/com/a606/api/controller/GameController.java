package com.a606.api.controller;

import com.a606.api.service.GameService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("api/")
@RequiredArgsConstructor
public class GameController {

    GameService gameService;

    @GetMapping("game/point/{userId}")
    public ResponseEntity<Long> getGamePoint(@PathVariable long userId) {
        return new ResponseEntity<Long>(gameService.getGamePointById(userId), HttpStatus.OK);
    }

    @PutMapping("game/point/{userId}/{point}")
    public ResponseEntity<Long> updateGamePoint(@PathVariable long userId, @PathVariable long point) {
        return new ResponseEntity<Long>(gameService.updateGamePointById(userId, point),HttpStatus.OK);
    }
}
