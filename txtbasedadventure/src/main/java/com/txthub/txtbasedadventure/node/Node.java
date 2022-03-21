package com.txthub.txtbasedadventure.node;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

@Data
public class Node {
    @Id
    private String id;
    private String storyId;
    private String title;
    private String body;
    private ArrayList<Integer> ChildrenId;
    private boolean start = true;
    private boolean endPoint = false;

    public Node(String id, String storyId, String title, String body, ArrayList<Integer> childrenId,boolean start, boolean endPoint) {
        this.id = id;
        this.storyId = storyId;
        this.title = title;
        this.body = body;
        ChildrenId = childrenId;
        this.start = start;
        this.endPoint = endPoint;
    }

    public Node(String storyId, String title, String body, ArrayList<Integer> childrenId,boolean start, boolean endPoint) {
        this.id = new ObjectId().toString();
        this.storyId = storyId;
        this.title = title;
        this.body = body;
        ChildrenId = childrenId;
        this.start = start;
        this.endPoint = endPoint;
    }

    public Node(){}
}
