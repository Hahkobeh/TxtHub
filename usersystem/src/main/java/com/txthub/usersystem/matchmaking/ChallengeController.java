package com.txthub.usersystem.matchmaking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("challenge/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ChallengeController {

    private final ChallengeService chService;

    @Autowired public ChallengeController(ChallengeService chService){
        this.chService = chService;
    }



    @GetMapping("/all/{username}")
    @ResponseBody
    public List<Challenge> getAllChallenges(@PathVariable String username){
        return chService.getChallengesForUser(username);
    }

    @GetMapping("/finished/{username}")
    @ResponseBody
    public List<Challenge> getAllFinishedChallenges(@PathVariable String username){
        return chService.getChallengesForUserFinished(username);
    }

    @GetMapping("/current/{username}")
    @ResponseBody
    public List<Challenge> getAllCurrentChallenges(@PathVariable String username){
        return chService.getChallengesForUserCurrent(username);
    }

    @PutMapping("/random/{game}/{username}")
    @ResponseBody
    public boolean sendRandomChallenge(@PathVariable String username){
        // Challenge ch = new Challenge();
        // return chService.addChallenge(ch);
        return false;
    }

    @PutMapping("/send/{username}")
    @ResponseBody
    public boolean sendChallenge(@RequestBody ChallengeForm chForm,@PathVariable String username){
        Challenge ch = new Challenge(username,chForm.getUsername(),chForm.getGame());
        return chService.addChallenge(ch);
    }



}
