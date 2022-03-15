package com.txthub.txtbasedadventure;

import com.txthub.txtbasedadventure.node.Node;
import com.txthub.txtbasedadventure.node.NodeService;
import com.txthub.txtbasedadventure.story.Story;
import com.txthub.txtbasedadventure.story.StoryForm;
import com.txthub.txtbasedadventure.story.StoryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("tba/api/v1")
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
        temp.add(new Story(new ObjectId().toString(), "journey to the center of the earth","usernameXD","ADVENTURE", 5, 0));
        temp.add(new Story(new ObjectId().toString(), "40 days in the dessert tray","hello1","FANTASY", 0, 0));


        return temp;
    }

    @GetMapping("/story/{id}")
    @ResponseBody
    public ArrayList<Node> getStory(@PathVariable String id){
        //grab all nodes from story
        return null;
    }

    @PostMapping("/newStory")
    @ResponseBody
    public String newStory(@RequestBody StoryForm storyForm){
        return null;
    }

}
