package com.txthub.usersystem.matchmaking;

import lombok.Data;

import java.util.Date;

@Data
public class QueueMember {
    private String id;
    private double rating;
    private Date entranceTime;

    public QueueMember(String id, double rating) {
        this.id = id;
        this.rating = rating;
        this.entranceTime = new Date();
    }
}
