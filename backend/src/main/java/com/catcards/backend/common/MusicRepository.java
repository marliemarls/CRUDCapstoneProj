package com.catcards.backend.common;

import com.catcards.backend.model.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository <Music, Integer> {

    List<Music> findByTitle(String title);

    List<Music> findByArtistName(String artistName);
}
