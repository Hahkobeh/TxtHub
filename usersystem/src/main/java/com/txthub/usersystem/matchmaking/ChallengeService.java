package com.txthub.usersystem.matchmaking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.txthub.usersystem.user.User;
import com.txthub.usersystem.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeService {

    private final ChallengeRepository chRepo;
    private final UserRepository userRepo;

    @Autowired
    public ChallengeService(ChallengeRepository chRepo,UserRepository userRepo){
        this.chRepo = chRepo;
        this.userRepo = userRepo;
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

    public ChallengeResult updateChallenge(String challengeId,String username,Double score){

        ChallengeResult cr = new ChallengeResult();

        Optional<Challenge> res = chRepo.findById(challengeId);
        Challenge ch = res.orElse(null);
        if(ch == null){
          
        }
        if(ch.getUsername1().equals(username)){
            ch.setScore1(score);
        }
        if(ch.getUsername2().equals(username)){
            ch.setScore2(score);
        }

        if(ch.getScore1() != -999 && ch.getScore2() != -999){
            ch.setFinished(true);
            
            if(ch.getScore1()>ch.getScore2()){
                cr.setWinner(ch.getUsername1());
                cr.setLoser(ch.getUsername2());
            }
            if(ch.getScore1()==ch.getScore2()){
                cr.setWinner(ch.getUsername1());
                cr.setLoser(ch.getUsername1());
            }
            else{
                cr.setWinner(ch.getUsername2());
                cr.setLoser(ch.getUsername1());
            }
            
        }

        chRepo.save(ch);
        return cr;
        
    }


    public boolean deleteChallenge(String challengeId) {
        try {
            chRepo.deleteById(challengeId);
        }catch (IllegalArgumentException e){
            return false;
        }
        return true;
    }


    public String findChallenger(String username) {
        List<User> u = userRepo.findAll();
        String opponent;
        do {
            Random rand = new Random();
            opponent = u.get(rand.nextInt(u.size())).getUsername();
        } while (username.equals(opponent));
        return opponent;
        

       
    }



    
}
