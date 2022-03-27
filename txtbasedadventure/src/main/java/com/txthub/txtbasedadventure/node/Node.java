package com.txthub.txtbasedadventure.node;

import com.txthub.txtbasedadventure.connection.Connection;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("nodes")
@Data
public class Node {
    @Id
    private String id;
    private String storyId;
    private String nodeName;
    private String body;
    private boolean end = false;

    public Node(String storyId) {
        this.id = new ObjectId().toString();
        this.storyId = storyId;
        this.nodeName = "";
        this.body = "";
    }

    public Node(String id, String storyId) {
        this.id = id;
        this.storyId = storyId;
        this.nodeName = "Start!";
        this.body = "Your story begins here";
    }

    public Node(){}
}
