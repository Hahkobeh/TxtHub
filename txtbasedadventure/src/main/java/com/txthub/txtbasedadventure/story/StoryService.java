package com.txthub.txtbasedadventure.story;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoryService {

    private final StoryRepository storyRepository;

    @Autowired
    public StoryService(StoryRepository storyRepository){
        this.storyRepository = storyRepository;
    }

    public ArrayList<Story> getStories (){
        return new ArrayList<Story>();
    }
}
