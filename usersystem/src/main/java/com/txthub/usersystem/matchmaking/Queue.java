package com.txthub.usersystem.matchmaking;

import lombok.Data;

import java.util.PriorityQueue;

@Data
public abstract class Queue {
    private PriorityQueue<QueueMember> pr;
    Queue(){
        pr = new PriorityQueue<>();
    }

    public void addToQueue(String id, double rating){
        pr.add(new QueueMember(id, rating));
    }

}
