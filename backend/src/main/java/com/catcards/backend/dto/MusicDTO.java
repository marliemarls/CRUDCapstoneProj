package com.catcards.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MusicDTO {
    private Integer id;
    private String title;
    private String artistName;
    private String genre;
    private String imageUrl;
    private String musicUrl;
    private Integer creatorId;
    private String creatorUsername;
}