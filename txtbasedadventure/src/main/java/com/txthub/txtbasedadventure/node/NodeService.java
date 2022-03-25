package com.txthub.txtbasedadventure.node;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class NodeService {
    private final NodeRepository nodeRepo;

    @Autowired
    public NodeService(NodeRepository nodeRepo){
        this.nodeRepo = nodeRepo;
    }


    public List<Node> getStoryNodes(String storyId){
        return nodeRepo.findByStoryId(storyId);
    }

    public void saveNode(Node n){

        nodeRepo.save(n);

    }

    public void delNode(String id){
        
            try{
                nodeRepo.deleteById(id);
            }catch(IllegalArgumentException e){

            }
        
    }




}
