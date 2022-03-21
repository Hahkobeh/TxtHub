package com.txthub.usersystem.user;

public class UserPair {
    String username;
    double rating;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public UserPair(String username, double rating) {
        this.username = username;
        this.rating = rating;
    }
}
