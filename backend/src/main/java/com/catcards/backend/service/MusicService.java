package com.catcards.backend.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DTO.MusicRequest;
import com.catcards.backend.common.MusicRepository;
import com.catcards.backend.common.UserRepository;
import com.catcards.backend.model.Music;
import com.catcards.backend.model.MyAppUser;

@Service
public class MusicService {


    @Autowired
    MusicRepository musicRepository;

    @Autowired
    UserRepository userRepository;


    public Optional<Music> createMusicForUser(Integer userId, MusicRequest newMusic){


        Optional<MyAppUser>foundUser = userRepository.findById(userId);
        Music saveMusic = new Music();

        if (foundUser.isPresent()){
            saveMusic.setArtistName(newMusic.getArtistName());
            saveMusic.setTitle(newMusic.getTitle());
            saveMusic.setGenre(newMusic.getGenre());
            saveMusic.setImage_url(newMusic.getImage_url());
            saveMusic.setMusic_url(newMusic.getMusic_url());
            saveMusic.setMyAppUserId(foundUser.get().getId());

            return Optional.of(musicRepository.save(saveMusic));

        }
        return Optional.empty();

    }


    public String deleteSingleMusic (Integer musicId){
        Optional<Music> foundMusic = musicRepository.findById(musicId);

        if(foundMusic.isPresent()){
            musicRepository.delete(foundMusic.get());
            return "Music was deleted";
        }

        return "WHat, no music was found for your id, stoopid";
    }



}