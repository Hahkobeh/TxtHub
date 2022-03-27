package com.txthub.txtbasedadventure.connection;

import com.txthub.txtbasedadventure.node.NodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {
    private final ConnectionRepository connectionRepository;

    @Autowired
    public ConnectionService(ConnectionRepository connectionRepository){
        this.connectionRepository = connectionRepository;
    }

    public List<Connection> getConnections(String storyId){
        return connectionRepository.findAllByStoryId(storyId);
    }

    public void removeConnection(String id){
        connectionRepository.deleteById(id);
    }

    public void addConnection(String storyId, String nodeId, String connectedNodeId){
        connectionRepository.save(new Connection(storyId, nodeId, connectedNodeId));
    }

    public void deleteNodeConnections(String nodeId){
        connectionRepository.deleteAllByNodeId(nodeId);
        connectionRepository.deleteAllByConnectedNodeId(nodeId);
    }

    public void deleteStoryConnections(String storyId){
        connectionRepository.deleteAllByStoryId(storyId);
    }

    public void updateConnections(List<Connection> connections, String storyId) {
        connectionRepository.deleteAllByStoryId(storyId);
        connectionRepository.saveAll(connections);

    }
}
