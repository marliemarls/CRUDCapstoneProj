package com.catcards.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catcards.backend.common.MusicRepository;
import com.catcards.backend.model.Music;
import com.catcards.backend.service.MusicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/music")
public class MusicController {


    @Autowired
    private MusicRepository musicRepository;




    @GetMapping("/allMusic")
    public ResponseEntity<?> getAllMusic() {
        List<Music> allMusic =  musicRepository.findAll();
        return ResponseEntity.ok().body(allMusic);
    }


    @GetMapping("/{musicId}")
    public ResponseEntity<?> getSingleMusic(@PathVariable Integer musicId){
        Optional <Music> singleMusic = musicRepository.findById( musicId);

        if(singleMusic.isPresent()){
            return ResponseEntity.ok().body(singleMusic);
        }

        return ResponseEntity.ok().body("Music with id not found");
    }


}