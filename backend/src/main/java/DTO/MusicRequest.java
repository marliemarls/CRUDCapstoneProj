package com.catcards.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicRequest {
    private String title;
    private String artistName;
    private String genre;
    private String image_url;
    private String music_url;
}