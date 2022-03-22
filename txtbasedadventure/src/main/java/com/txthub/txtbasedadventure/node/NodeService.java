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


    public List<Node> getStoryNodes(String id){
        return nodeRepo.findByStoryId(id);
    }

    public void addNode(Node n){
        if(n != null){
            try{
                nodeRepo.save(n);
            }catch(IllegalArgumentException e){

            }
        }
    }

    public void delNode(String id){
        
            try{
                nodeRepo.deleteById(id);
            }catch(IllegalArgumentException e){

            }
        
    }




}
