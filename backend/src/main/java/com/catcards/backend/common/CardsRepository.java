package com.catcards.backend.common;

import com.catcards.backend.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardsRepository extends JpaRepository<Card, Integer> {
    List<Card> findByTitle(String title);

    List<Card> findByArtistName(String artistName);
}
