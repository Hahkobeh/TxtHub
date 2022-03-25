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

    public List<Connection> getConnections(String nodeId){
        return connectionRepository.findAllByNodeId(nodeId);
    }

    public void removeConnection(String id){
        connectionRepository.deleteById(id);
    }

    public void addConnection(String nodeId, String connectedNodeId){
        connectionRepository.save(new Connection(nodeId,connectedNodeId));
    }

    public void deleteAllConnections(String nodeId){
        connectionRepository.deleteAllByNodeId(nodeId);
        connectionRepository.deleteAllByConnectedNodeId(nodeId);
    }
}
