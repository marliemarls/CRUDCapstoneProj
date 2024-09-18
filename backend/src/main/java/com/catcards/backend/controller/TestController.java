package com.catcards.backend.controller;
import com.catcards.backend.common.CardsRepository;
import com.catcards.backend.model.Card;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class TestController {

    private final CardsRepository cardsRepository;

    public TestController(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }

    @CrossOrigin
    @GetMapping("/test")
    public ResponseEntity<List<Card>> test(){
        List<Card> cards = cardsRepository.findAll();
        return ResponseEntity.ok(cards);
    }



}
