package com.txthub.txtbasedadventure.connection;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("connections")
@Data
public class Connection {
    @Id
    private String id;
    private String nodeId;
    private String connectedNodeId;

    public Connection(String id, String nodeId, String connectedNodeId) {
        this.id = id;
        this.nodeId = nodeId;
        this.connectedNodeId = connectedNodeId;
    }

    public Connection(String nodeId, String connectedNodeId) {
        this.id = new ObjectId().toString();
        this.nodeId = nodeId;
        this.connectedNodeId = connectedNodeId;
    }

    public Connection() {
    }
}
