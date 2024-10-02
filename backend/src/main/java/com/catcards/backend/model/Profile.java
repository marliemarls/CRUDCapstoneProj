package com.catcards.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
@Table(name = "profile")
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String profile_img;
    private String username;
    private String bio;
//    private Optional<Set<Music>> tracks;






    @Column(name="myappuser_id", nullable = false)
    private Integer myAppUserId;
}
