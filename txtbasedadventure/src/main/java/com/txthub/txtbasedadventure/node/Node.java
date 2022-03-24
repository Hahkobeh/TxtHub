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
    private boolean end = false;

    public Node(String id, String storyId) {
        this.id = id;
        this.storyId = storyId;
        this.title = "Start!";
        this.body = "Your story begins here";
        this.ChildrenId = new ArrayList<>();
    }

    public Node(){}
}
