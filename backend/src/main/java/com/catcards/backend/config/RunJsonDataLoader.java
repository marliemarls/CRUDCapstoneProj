package com.catcards.backend.config;

import com.catcards.backend.common.CardsRepository;
import com.catcards.backend.common.RolesRepository;
import com.catcards.backend.common.UserRepository;
import com.catcards.backend.model.Card;
import com.catcards.backend.model.MyAppUser;
import com.catcards.backend.model.Roles;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
public class RunJsonDataLoader implements CommandLineRunner {

    private final Logger logger = org.slf4j.LoggerFactory.getLogger(RunJsonDataLoader.class);
    private final CardsRepository cardsRepository;
    private final UserRepository userRepository;
    private final RolesRepository rolesRepository;
    private final ObjectMapper objectMapper;




    public RunJsonDataLoader(CardsRepository cardRepository,UserRepository userRepository, RolesRepository rolesRepository,
                             ObjectMapper objectMapper) {
        this.cardsRepository = cardRepository;
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.objectMapper = objectMapper;
    }


    @Override
    public void run(String... args) throws Exception {
        loadRoleData();
        loadUserData();
        loadCardData();
    }

    private void loadCardData(){
        if(cardsRepository.count() == 0){
            try(InputStream inputStream = getClass().getResourceAsStream("/data/cards.json")){
                List<Card> cards = objectMapper.readValue(inputStream, new TypeReference<List<Card>>() {
                });
                logger.info("Cards loaded from JSON file: {}", cards);
                cardsRepository.saveAll(cards);
            } catch (IOException e) {
                throw new RuntimeException("Unable to load data from JSON file: ", e);
            }
        } else {
            logger.info("Data already loaded");
        }
    }
    private void loadUserData(){
        if(userRepository.count() == 0){
            try(InputStream inputStream = getClass().getResourceAsStream("/data/users.json")){
                List<MyAppUser> myAppUsers = objectMapper.readValue(inputStream, new TypeReference<List<MyAppUser>>() {
                });
                logger.info("Users loaded from JSON file: {}", myAppUsers);
                userRepository.saveAll(myAppUsers);
            } catch (IOException e) {
                throw new RuntimeException("Unable to load data from JSON file: ", e);
            }
        } else {
            logger.info("Data already loaded");
        }
    }

    private void loadRoleData(){
        if(rolesRepository.count() == 0){
            try(InputStream inputStream = getClass().getResourceAsStream("/data/roles.json")){
                List<Roles> roles = objectMapper.readValue(inputStream, new TypeReference<List<Roles>>() {
                });
                logger.info("Users loaded from JSON file: {}", roles);
                rolesRepository.saveAll(roles);
            } catch (IOException e) {
                throw new RuntimeException("Unable to load data from JSON file: ", e);
            }
        } else {
            logger.info("Data already loaded");
        }
    }
}
