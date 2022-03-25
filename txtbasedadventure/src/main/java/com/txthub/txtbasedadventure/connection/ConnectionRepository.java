package com.txthub.txtbasedadventure.connection;

import com.txthub.txtbasedadventure.node.Node;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnectionRepository extends MongoRepository<Connection, String> {
    List<Connection> findAllByNodeId(String nodeId);
    void deleteAllByNodeId(String nodeId);
    void deleteAllByConnectedNodeId(String nodeId);
}