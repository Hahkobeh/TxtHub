package com.txthub.txtbasedadventure.node;

import java.util.List;

import com.txthub.txtbasedadventure.connection.Connection;
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



    public void deleteAllStoryNodes(String storyId){
            nodeRepository.deleteAllByStoryId(storyId);

    }



    public void updateNodes(List<Node> nodes, String storyId) {
        assert (nodes.size() != 0);
        nodeRepository.deleteAllByStoryId(storyId);
        nodeRepository.saveAll(nodes);
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
