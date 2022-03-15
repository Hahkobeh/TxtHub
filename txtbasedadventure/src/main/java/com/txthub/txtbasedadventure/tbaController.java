package com.txthub.txtbasedadventure;

import com.txthub.txtbasedadventure.node.NodeService;
import com.txthub.txtbasedadventure.story.Story;
import com.txthub.txtbasedadventure.story.StoryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@Controller
@RequestMapping("wordle/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class tbaController {

    private final NodeService nodeService;
    private final StoryService storyService;

    @Autowired
    public tbaController(NodeService nodeService, StoryService storyService){
        this.nodeService = nodeService;
        this.storyService = storyService;
    }

    @GetMapping("/getstories")
    @ResponseBody
    public ArrayList<Story> getStories(){
        ArrayList<Story> temp = new ArrayList<>();
        temp.add(new Story(new ObjectId().toString(), "journey to the center of the earth","usernameXD", 5, 0));
        temp.add(new Story(new ObjectId().toString(), "40 days in the dessert tray","hello1", 0, 0));


        return temp;
    }

}
