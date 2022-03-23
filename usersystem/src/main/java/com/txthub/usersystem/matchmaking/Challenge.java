package com.txthub.usersystem.matchmaking;

import lombok.Data;

import com.txthub.usersystem.user.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
@Document("challenge")
public class Challenge {
    @Id
    private String challengeId;
    private String username1;
    private String username2; 
    private double score1;
    private double score2;
    private boolean finished;
    private String game;  // "wordle" || "anagram"

    

    public Challenge(String username1, String username2, String game){
        this.challengeId = new ObjectId().toString();
        this.username1 = username1;
        this.username2 = username2;
        this.game = game;
        this.finished = false;
    }

}
