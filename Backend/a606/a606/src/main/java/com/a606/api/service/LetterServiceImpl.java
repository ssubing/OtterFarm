package com.a606.api.service;

import com.a606.db.entity.Letter;
import com.a606.db.entity.User;
import com.a606.db.repository.LetterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LetterServiceImpl implements LetterService{
    @Autowired
    LetterRepository letterRepository;

    @Override
    public void createLetter(User user, String msg) {
        Letter letter = new Letter();
        letter.setUser(user);
        letter.setMsg(msg);
        letter.setRead(false);
        letterRepository.save(letter);
    }

    @Override
    public void readLetter(long letterId) {
        Letter letter = letterRepository.findById(letterId).get();
        letter.setRead(true);
        letterRepository.save(letter);
    }

    @Override
    public List<Letter> getAllLetters(long userId) {
        List<Letter> lists = letterRepository.findAll();
        List<Letter> list = new ArrayList<>();

        for(Letter l : lists) {
            if(userId == l.getUser().getId()) {
                list.add(l);
            }
        }

        return list;
    }
}
