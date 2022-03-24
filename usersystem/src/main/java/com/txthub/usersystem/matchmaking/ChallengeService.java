package com.txthub.usersystem.matchmaking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeService {

    private final ChallengeRepository chRepo;

    @Autowired
    public ChallengeService(ChallengeRepository chRepo){
        this.chRepo = chRepo;
    }


    public List<Challenge> getChallengesForUser(String username){
        List<Challenge> chls = chRepo.findByUsername1(username);
        chls.addAll(chRepo.findByUsername2(username));

        return chls;
    }

    public List<Challenge> getChallengesForUserCurrent(String username){
        List<Challenge> chls = chRepo.findByUsername1(username);
        chls.addAll(chRepo.findByUsername2(username));
        List<Challenge> fins = new ArrayList<Challenge>();
        for(Challenge ch : chls){
            if(ch.isFinished()){
                fins.add(ch);
            }
        }
        chls.removeAll(fins);
        return chls;
    }

    public List<Challenge> getChallengesForUserFinished(String username){
        List<Challenge> chls = chRepo.findByUsername1(username);
        chls.addAll(chRepo.findByUsername2(username));
        List<Challenge> curr = new ArrayList<Challenge>();
        for(Challenge ch : chls){
            if(!ch.isFinished()){
                curr.add(ch);
            }
        }
        chls.removeAll(curr);
        
        return chls;
    }

    public boolean addChallenge(Challenge c){
        if(c != null){
            try{
                chRepo.save(c);
                return true;
            }catch(IllegalArgumentException e){
                return false;
            }
        }
        return false;
    }

    public boolean updateChallenge(String challengeId,String username,Double score){


        Optional<Challenge> res = chRepo.findById(challengeId);
        Challenge ch = res.orElse(null);
        if(ch == null){
            return false;
        }
        if(ch.getUsername1().equals(username)){
            ch.setScore1(score);
        }
        if(ch.getUsername2().equals(username)){
            ch.setScore2(score);
        }

        if(ch.getScore1() != -999 && ch.getScore2() != -999){
            ch.setFinished(true);
        }

        chRepo.save(ch);
        return true;
    }



    
}
