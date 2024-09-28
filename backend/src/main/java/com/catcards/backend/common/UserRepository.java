package com.catcards.backend.common;

import com.catcards.backend.model.MyAppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<MyAppUser, Integer> {

    Optional<MyAppUser> findByUsername(String username);

    Optional<MyAppUser> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<MyAppUser> findByEnabled(Boolean enabled);

    List<MyAppUser> findByFirstNameAndLastName(String firstName, String lastName);
}