//package com.catcards.backend.service;
//
//import com.catcards.backend.common.RolesRepository;
//import com.catcards.backend.common.UserRepository;
//import com.catcards.backend.dto.LoginRequest;
//import com.catcards.backend.dto.SignupRequest;
//import com.catcards.backend.dto.AuthResponse;
//import com.catcards.backend.model.MyAppUser;
//import com.catcards.backend.model.Roles;
//
//import com.catcards.backend.security.JwtTokenProvider;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Service
//public class AuthServiceImpl implements AuthService {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RolesRepository rolesRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    public AuthResponse registerUser(SignupRequest signupRequest) {
//        if (userRepository.existsByUsername(signupRequest.getUsername())) {
//            throw new RuntimeException("Username is already taken!");
//        }
//
//        if (userRepository.existsByEmail(signupRequest.getEmail())) {
//            throw new RuntimeException("Email is already in use!");
//        }
//
//        MyAppUser user = new MyAppUser();
//        user.setUsername(signupRequest.getUsername());
//        user.setEmail(signupRequest.getEmail());
//        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//        user.setFirstName(signupRequest.getFirstName());
//        user.setLastName(signupRequest.getLastName());
//        user.setGender(signupRequest.getGender());
//        user.setDob(signupRequest.getDob());
//        user.setEnabled(true);
//
//        Set<Roles> roles = new HashSet<>();
//        Roles userRole = rolesRepository.findByRole("ROLE_USER")
//                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//        roles.add(userRole);
//        user.setRoles(roles);
//
//        userRepository.save(user);
//
//        String jwt = jwtTokenProvider.generateToken(user.getUsername());
//        return new AuthResponse(jwt, "User registered successfully!");
//    }
//
//    @Override
//    public AuthResponse authenticateUser(LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtTokenProvider.generateToken(authentication.getName());
//        return new AuthResponse(jwt, "User authenticated successfully!");
//    }
//
//    @Override
//    public void logoutUser() {
//        SecurityContextHolder.clearContext();
//    }
//
//    @Override
//    public MyAppUser getCurrentUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        return userRepository.findByUsername(authentication.getName())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
//}