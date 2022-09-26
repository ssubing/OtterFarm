package com.a606.api.controller;

import com.a606.api.service.LetterService;
import com.a606.db.entity.Letter;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Api(value = "알림 API", tags = {"Letter"})
@RestController
@RequestMapping("api/")
@RequiredArgsConstructor
public class LetterController {
    LetterService letterService;

    @GetMapping("letter/user/{userId}")
    public ResponseEntity<List<Letter>> getLetters(@PathVariable long userId) {
        return new ResponseEntity<List<Letter>>(letterService.getAllLetters(userId), HttpStatus.OK);
    }

    @GetMapping("letter/{letterId}")
    public void readLetter(@PathVariable long letterId) {
       letterService.readLetter(letterId);
    }
}
