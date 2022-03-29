package com.txthub.wordle.wordlelogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("wordle/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class WordleController {

    private final WordleService wordleService;

    @Autowired
    public WordleController(WordleService wordleService){
        this.wordleService = wordleService;
    }

    @GetMapping("/getword")
    @ResponseBody
    public String wordRequest(){
        return wordleService.getWord();
    }

    @GetMapping("/testword/{word}")
    @ResponseBody
    public boolean validWord(@PathVariable String word){
        if(word.length() != 5){
            return false;
        }
        return wordleService.checkIfValid(word);
    }
}
