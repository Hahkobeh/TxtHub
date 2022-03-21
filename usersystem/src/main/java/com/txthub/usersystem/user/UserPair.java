package com.txthub.usersystem.user;

public class UserPair {
    int rank;
    String username;
    double rating;

    public UserPair(int rank, String username, double rating) {
        this.rank = rank;
        this.username = username;
        this.rating = rating;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

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

}
