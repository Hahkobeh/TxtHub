package com.txthub.anagram.anagramLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("anagram/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AnagramController {

    private final AnagramService anagramService;

    @Autowired
    public AnagramController(AnagramService anagramService){
        this.anagramService = anagramService;
    }

    @GetMapping("/getword")
    @ResponseBody
    public String wordRequest(){
        return anagramService.getWord();
    }

    @GetMapping("/testword/{word}")
    @ResponseBody
    public boolean validWord(@PathVariable String word){
        if(word.length() != 5){
            return false;
        }
        return anagramService.checkIfValid(word);
    }
}
