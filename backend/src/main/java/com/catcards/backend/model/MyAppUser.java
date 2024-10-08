package com.catcards.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "user")
@Entity
public class MyAppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String email;
    private String password;
    private String gender;
    private String dob;
    private String firstName;
    private String lastName;
    // private Boolean enabled;

    // @ManyToMany(fetch = FetchType.EAGER)
    // @JoinTable(
    //         name = "user_roles",
    //         joinColumns = @JoinColumn(name = "user_id"),
    //         inverseJoinColumns = @JoinColumn(name = "role_id"))
    // private Set<Roles> roles;

//i dont think this works???
//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "music",
//            joinColumns = @JoinColumn(name = "myappuser_id"),
//            inverseJoinColumns = @JoinColumn(name = "username")
//    )
//    private Set<Music> music;
}