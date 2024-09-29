package com.catcards.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.catcards.DTO.LoginRequest;
import com.catcards.backend.common.MusicRepository;
import com.catcards.backend.common.UserRepository;
import com.catcards.backend.model.Music;
import com.catcards.backend.model.MyAppUser;

@Service
public class UserService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    MusicRepository musicRepository;


    public Optional<MyAppUser> login(LoginRequest loginRequest){
        Optional<MyAppUser> user = userRepository.findByEmail(loginRequest.getEmail());


        if(user.isPresent()){
            MyAppUser userFound = user.get();

            if( userFound.getPassword().equals(loginRequest.getPassword())){
                return Optional.of(userFound);
            }
        }

        return Optional.empty();
    }


    public Optional<MyAppUser> register( MyAppUser newUser){
        Optional<MyAppUser> user = userRepository.findByEmail(newUser.getEmail());

        if(user.isPresent()){
            MyAppUser userFound = user.get();

            if( userFound.getEmail().equals(newUser.getEmail())){
                return Optional.empty();
            }
        }
        Optional<MyAppUser> savedUser = Optional.ofNullable(userRepository.save(newUser));
        return  savedUser;
    }



    public List<Music> findAllMusicByUser(Integer userId) {
        return musicRepository.findByMyAppUserId(userId);
    }


    public Optional<Music> editSingleMusic( Integer musicId, Music newMusicInfo){
        Optional<Music> foundMusic = musicRepository.findById(musicId);

        if(foundMusic.isPresent()){

            foundMusic.get().setArtistName(newMusicInfo.getArtistName());
            foundMusic.get().setTitle(newMusicInfo.getTitle());
            foundMusic.get().setArtistName(newMusicInfo.getArtistName());
            foundMusic.get().setGenre(newMusicInfo.getGenre());
            foundMusic.get().setImage_url(newMusicInfo.getImage_url());
            foundMusic.get().setMusic_url(newMusicInfo.getMusic_url());

            Music foundMusicEdited = musicRepository.save(foundMusic.get());
            return Optional.of(foundMusicEdited);
        }
        return Optional.empty();
    }

}