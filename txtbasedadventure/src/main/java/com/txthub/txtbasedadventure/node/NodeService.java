package com.txthub.txtbasedadventure.node;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodeService {
    private final NodeRepository nodeRepository;

    @Autowired
    public NodeService(NodeRepository nodeRepository){
        this.nodeRepository = nodeRepository;
    }


    public List<Node> getStoryNodes(String storyId){
        return nodeRepository.findByStoryId(storyId);
    }



    public boolean deleteAllStoryNodes(String storyId){
        try{
            nodeRepository.deleteAllByStoryId(storyId);
        }catch (Exception e){
            return false;
        }
        return true;
    }



    public void updateNodes(List<Node> nodes) {
        assert (nodes.size() != 0);
        String storyId = nodes.get(0).getStoryId();
        if (nodes.size() == nodeRepository.findByStoryId(storyId).size()) {
            nodeRepository.saveAll(nodes);
        } else {
            nodeRepository.deleteAllByStoryId(nodes.get(0).getStoryId());
            nodeRepository.saveAll(nodes);
        }
    }


    public void deleteNode(String nodeId) {
        nodeRepository.deleteById(nodeId);
    }

    public Node createNode(String storyId){
        Node node =  new Node(storyId);
        nodeRepository.save(node);
        return node;
    }

    public void createFirstNode(String id, String storyId   ){
        Node node = new Node(id, storyId);
        nodeRepository.save(node);
    }
}
