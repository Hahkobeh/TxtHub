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
    private String storyId;
    private String nodeId;
    private String connectedNodeId;

    public Connection(String id,String storyId, String nodeId, String connectedNodeId) {
        this.id = id;
        this.storyId = storyId;
        this.nodeId = nodeId;
        this.connectedNodeId = connectedNodeId;
    }

    public Connection(String nodeId, String storyId, String connectedNodeId) {
        this.id = new ObjectId().toString();
        this.storyId = storyId;
        this.nodeId = nodeId;
        this.connectedNodeId = connectedNodeId;
    }

    public Connection() {
    }
}
