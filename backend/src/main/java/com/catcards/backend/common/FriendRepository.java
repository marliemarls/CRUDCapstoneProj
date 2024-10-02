package com.catcards.backend.common;
import com.catcards.backend.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Integer> {
    List<Friend> findByUserId(Integer userId);
    List<Friend> findByFriendId(Integer friendId);
}