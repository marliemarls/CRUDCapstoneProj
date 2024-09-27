package com.catcards.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
@Table(name = "music")
public class Music {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String artistName;
    private String genre;
    private String image_url;
    private String music_url;


    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private MyAppUser creator;
}