package com.txthub.usersystem.matchmaking;

import lombok.Data;

@Data
public class ChallengeView {

    private String challengeId;
    private String opponent;
    private double userScore;
    private double opScore;
    private String game;  // "wordle" || "anagram"

    public ChallengeView(Challenge ch,String username){
        this.challengeId = ch.getChallengeId();
        if(username.equals(ch.getUsername1())){
        this.opponent = ch.getUsername2();
        this.userScore = ch.getScore1();
        this.opScore = ch.getScore2();
        }
        else {
        this.opponent = ch.getUsername1();
        this.userScore = ch.getScore2();
        this.opScore = ch.getScore1();
        }

        this.game = ch.getGame();
    }

}
