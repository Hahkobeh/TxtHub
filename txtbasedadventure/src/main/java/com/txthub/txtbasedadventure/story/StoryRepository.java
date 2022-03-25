package com.txthub.txtbasedadventure.story;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends MongoRepository<Story, String> {

    Story findStoryById(String id);
    List<Story> findStoryByGenre(Genre genre);
    List<Story> findAllByAuthorUsername(String username);
    

}
