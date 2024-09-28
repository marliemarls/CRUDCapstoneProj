package com.catcards.backend.common;

import com.catcards.backend.model.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicRepository extends JpaRepository <Music, Integer> {

    List<Music> findByTitle(String title);

    List<Music> findByArtistName(String artistName);

    @Query("SELECT m FROM Music m WHERE m.genre = :genre AND m.creator.id = :creatorId")
    List<Music> findByGenreAndCreatorId(@Param("genre") String genre, @Param("creatorId") Integer creatorId);
}
