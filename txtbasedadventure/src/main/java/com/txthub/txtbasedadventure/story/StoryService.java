package com.txthub.txtbasedadventure.story;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {

    private final StoryRepository storyRepository;

    @Autowired
    public StoryService(StoryRepository storyRepo){
        this.storyRepository = storyRepo;
    }

    public List<Story> getAllStories (){
        return storyRepository.findAll();
    }


    public List<Story> getStoriesByLikes(){
        return storyRepository.findAll(Sort.by(Direction.DESC,"Likes"));
    }

    public List<Story> getStoriesByAuthor(String username){
        return storyRepository.findAllByAuthorUsername(username);
    }
    
    
    
    public Story createStory(StoryForm storyForm){
        Story story = new Story(storyForm.getStoryName(),storyForm.getAuthor(),storyForm.getGenre());

        storyRepository.save(story);
        return story;

    }


    public void deleteStory(String storyId) {
        storyRepository.deleteById(storyId);

    }


    public void like(String storyId) {
        Story story = storyRepository.findStoryById(storyId);
        story.setLikes(story.getLikes() + 1);
        System.out.println("added like?");
        storyRepository.save(story);
    }

    public void dislike(String storyId){
        Story story = storyRepository.findStoryById(storyId);
        story.setDislikes(story.getDislikes() + 1);
        storyRepository.save(story);
    }
}
