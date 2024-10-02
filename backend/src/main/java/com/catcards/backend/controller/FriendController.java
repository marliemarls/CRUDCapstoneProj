package com.catcards.backend.controller;

import com.catcards.backend.model.Friend;
import com.catcards.backend.common.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private FriendRepository friendRepository;

    @GetMapping
    public List<Friend> getAllFriends() {
        return friendRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Friend> getFriendById(@PathVariable Integer id) {
        return friendRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Friend> getFriendsByUserId(@PathVariable Integer userId) {
        return friendRepository.findByUserId(userId);
    }

    @PostMapping
    public Friend createFriend(@RequestBody Friend friend) {
        return friendRepository.save(friend);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Friend> updateFriend(@PathVariable Integer id, @RequestBody Friend friendDetails) {
        return friendRepository.findById(id)
                .map(friend -> {
                    friend.setUserId(friendDetails.getUserId());
                    friend.setFriendId(friendDetails.getFriendId());
                    friend.setStatus(friendDetails.getStatus());
                    return ResponseEntity.ok(friendRepository.save(friend));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFriend(@PathVariable Integer id) {
        return friendRepository.findById(id)
                .map(friend -> {
                    friendRepository.delete(friend);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}