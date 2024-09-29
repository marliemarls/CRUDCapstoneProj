//package com.catcards.backend.common;
//
//import com.catcards.backend.model.Roles;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@Repository
//public interface RolesRepository extends JpaRepository<Roles, Integer> {
//
//    Optional<Roles> findByRole(String role);
//
//    Boolean existsByRole(String role);
//}