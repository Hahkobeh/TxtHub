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
        /*List<Story> temp = new ArrayList<>();
        temp.add(new Story(new ObjectId().toString(), "journey to the center of the earth","usernameXD","ADVENTURE", 5, 0));
        temp.add(new Story(new ObjectId().toString(), "40 days in the dessert tray","hello1","FANTASY", 0, 0));


        System.out.println(temp.toString());
        return temp;*/

        return storyService.getAllStories();
    }

    @GetMapping("/getStoriesByLikes")
    @ResponseBody
    public List<Story> getStoriesByLikes(){
        return storyService.getStoriesByLikes();
    }


    @GetMapping("/story/{storyId}")
    @ResponseBody
    public List<Node> getStories(@PathVariable String storyId){
        
        return nodeService.getStoryNodes(storyId);
    }

    @GetMapping("/getStories/{authorUsername}")
    @ResponseBody
    public List<Story> getStoriesByAuthor(@PathVariable String authorUsername){
        return storyService.getStoriesByAuthor(authorUsername);
    }


    @DeleteMapping("/deleteStory/{storyId}")
    @ResponseBody
    public boolean deleteStory(@PathVariable String storyId){
        return nodeService.deleteAllStoryNodes(storyId) && storyService.deleteStory(storyId);

    }


    @PostMapping("/newStory")
    @ResponseBody
    public void newStory(@RequestBody StoryForm storyForm) {


        Story story = storyService.createStory(storyForm);
        nodeService.createFirstNode(story.getFirstNodeId(),story.getId());
    }


    //NODES!!

    @GetMapping("/nodes/{storyId}")
    @ResponseBody
    public List<Node> getNodes(@PathVariable String storyId){
        return nodeService.getStoryNodes(storyId);
    }

    @PutMapping("/updateNodes")
    public void saveChanges(@RequestBody List<Node> nodes){
        nodeService.updateNodes(nodes);
    }

    @DeleteMapping("/deleteNode/{nodeId}")
    public void deleteNode(@PathVariable String nodeId){
        connectionService.deleteAllConnections(nodeId);
        nodeService.deleteNode(nodeId);
    }

    @PostMapping("/addNode/{storyId}/{nodeId}")
    @ResponseBody
    public Node addNode(@PathVariable String storyId, @PathVariable String nodeId){
        Node node = nodeService.createNode(storyId);
        connectionService.addConnection(nodeId, node.getId());
        return node;
    }

    //CONNECTIONS!!!

    @GetMapping("/getConnections/{nodeId}")
    @ResponseBody
    public List<Connection> getConnections(@PathVariable String nodeId){
        return connectionService.getConnections(nodeId);
    }

    @PostMapping("/addConnection/{nodeId}/{connectionId}")
    public void addConnection(@PathVariable String nodeId, @PathVariable String connectionId){
        connectionService.addConnection(nodeId,connectionId);
    }

    @DeleteMapping("deleteConnection/{id}")
    public void removeConnection(@PathVariable String id){
        connectionService.removeConnection(id);
    }


}
