package com.txthub.txtbasedadventure;

import com.txthub.txtbasedadventure.connection.Connection;
import com.txthub.txtbasedadventure.connection.ConnectionService;
import com.txthub.txtbasedadventure.node.Node;
import com.txthub.txtbasedadventure.node.NodeService;
import com.txthub.txtbasedadventure.story.Story;
import com.txthub.txtbasedadventure.story.StoryForm;
import com.txthub.txtbasedadventure.story.StoryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final ConnectionService connectionService;

    @Autowired
    public tbaController(NodeService nodeService, StoryService storyService, ConnectionService connectionService){
        this.nodeService = nodeService;
        this.storyService = storyService;
        this.connectionService = connectionService;
    }

    @GetMapping("/getAllStories")
    @ResponseBody
    public List<Story> getAllStories(){
        return storyService.getAllStories();
    }

    @GetMapping("/getStoriesByLikes")
    @ResponseBody
    public List<Story> getStoriesByLikes(){
        return storyService.getStoriesByLikes();
    }



    @GetMapping("/getStories/{authorUsername}")
    @ResponseBody
    public List<Story> getStoriesByAuthor(@PathVariable String authorUsername){
        return storyService.getStoriesByAuthor(authorUsername);
    }


    @PostMapping("/newStory")
    @ResponseBody
    public void newStory(@RequestBody StoryForm storyForm) {


        Story story = storyService.createStory(storyForm);
        nodeService.createFirstNode(story.getFirstNodeId(),story.getId());
    }

    @DeleteMapping("/deleteStory/{storyId}")
    public ResponseEntity<String> deleteStory(@PathVariable String storyId){
        System.out.println("delete story" + storyId);
        storyService.deleteStory(storyId);
        nodeService.deleteAllStoryNodes(storyId);
        connectionService.deleteStoryConnections(storyId);
        return new ResponseEntity<>(storyId, HttpStatus.OK);

    }


    //NODES!!

    @GetMapping("/nodes/{storyId}")
    @ResponseBody
    public List<Node> getNodes(@PathVariable String storyId){
        return nodeService.getStoryNodes(storyId);
    }

    @PutMapping("/updateNodes/{storyId}")
    public ResponseEntity<String> saveNodeChanges(@RequestBody List<Node> nodes, @PathVariable String storyId){
        System.out.println(nodes);
        nodeService.updateNodes(nodes, storyId);
        return new ResponseEntity<>(storyId, HttpStatus.OK);
    }



    //CONNECTIONS!!!

    @GetMapping("/connections/{storyId}")
    @ResponseBody
    public List<Connection> getConnections(@PathVariable String storyId){
        return connectionService.getConnections(storyId);
    }

    @PutMapping("/updateConnections/{storyId}")
    public ResponseEntity<String> saveConnectionChanges(@RequestBody List<Connection> connections, @PathVariable String storyId){
        System.out.println(connections);
        connectionService.updateConnections(connections, storyId);
        return new ResponseEntity<>(storyId, HttpStatus.OK);
    }

    //LIKES/dislikes!!

    @PutMapping("/like/{storyId}")
    @ResponseBody
    public boolean likeStory(@PathVariable String storyId){
        storyService.like(storyId);
        return true;
    }

    @PutMapping("/dislike/{storyId}")
    @ResponseBody
    public boolean dislikeStory(@PathVariable String storyId){
        storyService.dislike(storyId);
        return true;
    }




}
