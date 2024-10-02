package com.catcards.backend.controller;
import com.catcards.backend.common.MusicRepository;
import com.catcards.backend.model.Music;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
public class TestController {

    private final MusicRepository musicRepository;

    public TestController(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }


    @CrossOrigin
    @GetMapping("/test")
    public ResponseEntity<List<Music>> test(){
        List<Music> music = musicRepository.findAll();
        return ResponseEntity.ok(music);
    }





}