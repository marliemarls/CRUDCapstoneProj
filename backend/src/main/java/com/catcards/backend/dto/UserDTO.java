package com.catcards.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private String dob;
    private Set<String> roles;
}