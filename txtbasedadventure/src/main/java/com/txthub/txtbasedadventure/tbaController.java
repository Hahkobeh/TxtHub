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
import java.util.List;

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

    @GetMapping("/getAllStories")
    @ResponseBody
    public List<Story> getAllStories(){
        /*List<Story> temp = new ArrayList<>();
        temp.add(new Story(new ObjectId().toString(), "journey to the center of the earth","usernameXD","ADVENTURE", 5, 0));
        temp.add(new Story(new ObjectId().toString(), "40 days in the dessert tray","hello1","FANTASY", 0, 0));


        System.out.println(temp.toString());
        return temp;*/

        return storyService.getAllStories();
    }

    @GetMapping("/story/{storyId}")
    @ResponseBody
    public List<Node> getStories(@PathVariable String storyId){
        
        return nodeService.getStoryNodes(storyId);
    }

    @GetMapping("/getstories/{authorUsername}")
    @ResponseBody
    public List<Story> getStoriesByAuthor(@PathVariable String authorUsername){
        return storyService.getStoriesByAuthor(authorUsername);
    }





    @PostMapping("/newStory")
    @ResponseBody
    public Story newStory(@RequestBody StoryForm storyForm) {


        Story story = storyService.createStory(storyForm);
        Node firstNode = new Node(story.getFirstNodeId(), story.getId());
        nodeService.saveNode(firstNode);
        return story;
    }


}
