//package com.catcards.backend.controller;
//
//
//import com.catcards.backend.common.MusicRepository;
//import com.catcards.backend.common.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@CrossOrigin
//@RestController
//@RequestMapping("/api/profile")
//public class ProfileController {
//    @Autowired
//    MusicRepository musicRepository;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @GetMapping("/{userId}")
//    public ResponseEntity<?> getArtistProfile(@PathVariable Integer userId){
//        Optional<?> singleArtist = userRepository.findById(userId);
//
//        if(singleArtist.isPresent()){
//            return ResponseEntity.ok().body(singleArtist);
//        }
//        return ResponseEntity.ok().body("Artist not found.");
//    }
//}
