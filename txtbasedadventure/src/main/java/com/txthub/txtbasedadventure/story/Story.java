package com.txthub.txtbasedadventure.story;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class Story {
    @Id
    private String id;
    private String name;
    private String AuthorUsername;
    private int likes = 0;
    private int dislikes = 0;

    public Story(String id, String name, String authorUsername, int likes, int dislikes) {
        this.id = id;
        this.name = name;
        AuthorUsername = authorUsername;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    public Story(String name, String authorUsername) {
        this.id = new ObjectId().toString();
        this.name = name;
        AuthorUsername = authorUsername;
    }

    public Story(){}
}
