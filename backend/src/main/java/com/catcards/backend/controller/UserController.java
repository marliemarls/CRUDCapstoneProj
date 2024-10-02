package com.catcards.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import DTO.LoginRequest;
import DTO.MusicRequest;
import com.catcards.backend.common.UserRepository;
import com.catcards.backend.model.Music;
import com.catcards.backend.model.MyAppUser;
import com.catcards.backend.service.MusicService;
import com.catcards.backend.service.UserService;


@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    @Autowired
    private MusicService musicService;

    @GetMapping("/allUsers")
    public ResponseEntity<?> getAllMusic() {
        List<MyAppUser> allUsers =  userRepository.findAll();
        return ResponseEntity.ok().body(allUsers);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody MyAppUser newUser) {
        Optional<MyAppUser> user = userService.register(newUser);

        if(user.isPresent()){
            return ResponseEntity.ok().body(user.get());
        }
        return ResponseEntity.ok().body("Email is already in use");

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        Optional<MyAppUser> user = userService.login(loginRequest);
        System.out.println(user);
        if(user.isPresent()){
            return ResponseEntity.ok().body(user.get());
        }

        return ResponseEntity.ok().body("Username or Email is Incorrect");
    }


    @PostMapping("/{userId}/addMusic")
    public ResponseEntity<?> postMethodName(@PathVariable Integer userId, @RequestBody MusicRequest newMusic) {

        Optional<Music> musicCreated = musicService.createMusicForUser(userId, newMusic);

        if(musicCreated.isPresent()){
            return ResponseEntity.ok().body(musicCreated.get());
        }


        return ResponseEntity.badRequest().body("Music cannot be created, user might not exist");


    }


    @GetMapping("/{userId}/getMyMusic")
    public ResponseEntity<?>getUsersMusic(@PathVariable Integer userId) {
        List<Music> allUsersMusic = userService.findAllMusicByUser(userId);

        return ResponseEntity.ok().body(allUsersMusic);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?>getUsersInfo(@PathVariable Integer userId) {
        Optional<MyAppUser> userInfo = userService.findById(userId);

        return ResponseEntity.ok().body(userInfo);
    }

    //You can pass the app user id in the path variable and do a check in the service to see if it matches with the music found in our database, ie compare myappuser.id = muuic.myappuserid
    @PutMapping("/editMusic/{musicId}")
    public ResponseEntity<?> editSingleMusic(@PathVariable Integer musicId, @RequestBody  Music musicToBeEdited) {

        Optional<Music> editedSingleMusic = userService.editSingleMusic(musicId, musicToBeEdited);


        System.out.println(editedSingleMusic);
        if(editedSingleMusic.isPresent()){
            return ResponseEntity.ok().body(editedSingleMusic.get());
        }
        return ResponseEntity.ok().body("music with id not found");

    }


    @DeleteMapping("/deleteMusic/{musicId}")
    public ResponseEntity<?> deleteSingleMusic (@PathVariable Integer musicId){

        String result = musicService.deleteSingleMusic(musicId);

        return ResponseEntity.ok().body(result);
    }













}