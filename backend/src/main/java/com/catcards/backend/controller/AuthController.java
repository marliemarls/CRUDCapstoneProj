package com.catcards.backend.controller;

import com.catcards.backend.dto.AuthResponse;
import com.catcards.backend.dto.LoginRequest;
import com.catcards.backend.dto.SignupRequest;
import com.catcards.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController{

        @Autowired
        private AuthService authService;

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
            AuthResponse response = authService.registerUser(signUpRequest);
            return ResponseEntity.ok(response);
        }

        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
            AuthResponse response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(response);
        }

        @PostMapping("/logout")
        public ResponseEntity<?> logoutUser() {
            authService.logoutUser();
            return ResponseEntity.ok("User logged out successfully");
        }
}
