package com.txthub.usersystem.user;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.mongodb.client.model.Sorts.descending;
import static java.lang.Math.pow;
import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Boolean createUser(String username, String password){
        List<User> user = userRepository.findByUsername(username);
        if(user.isEmpty()){
            System.out.println("user not found, creating a user");
            User newUser = new User(username, password);
            userRepository.save(newUser);
            return true;
        }
        System.out.println("user found");

        return false;

    }

    public User login(String username, String password){
        List<User> userList = userRepository.findByUsernameAndPassword(username,password);
        if(!userList.isEmpty()) {
            return userList.get(0);
        }
        return null;
    }

    public User changePassword(String id, String newPassword){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setPassword(newPassword);
            userRepository.save(user.get());
            return user.get();
        }
        return null;
    }

    public User changeUsername(String id, String newUsername){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setUsername(newUsername);
            userRepository.save(user.get());
            return user.get();
        }
        return null;
    }

    public boolean deleteAccount(String id){
        try {
            userRepository.deleteById(id);
        }catch (IllegalArgumentException e){
            return false;
        }
        return true;
    }


    public boolean updateRating(String game, String winnerName, String loserName){
        Optional<User> winner = userRepository.findOneByUsername(winnerName);
        Optional<User> loser = userRepository.findOneByUsername(loserName);
        if(winner.isEmpty() || loser.isEmpty()){
            return false;
        }


        switch (game){
            case "Anagrams":
                changeAnagramRating(winner.get(), loser.get());
                return true;
            case "Wordle":
                changeWordleRating(winner.get(), loser.get());
                return true;
            case "tba":
                changeTbaRating(winner.get(), loser.get());
                return true;
            default:
                return false;
        }
    }

    public void changeAnagramRating(User winner, User loser){

        double change = calculateChange(winner.getAnagramRating(), loser.getAnagramRating());
        winner.setAnagramRating(winner.getAnagramRating() + change);
        userRepository.save(winner);
        loser.setAnagramRating(loser.getAnagramRating() - change);
        userRepository.save(loser);
    }

    public void changeWordleRating(User winner, User loser){
        double change = calculateChange(winner.getWordleRating(), loser.getWordleRating());
        winner.setWordleRating(winner.getWordleRating() + change);
        userRepository.save(winner);
        loser.setWordleRating(loser.getWordleRating() - change);
        userRepository.save(loser);
    }

    public void changeTbaRating(User winner, User loser){
        double change = calculateChange(winner.getTbaRating(), loser.getTbaRating());
        winner.setTbaRating(winner.getTbaRating() + change);
        userRepository.save(winner);
        loser.setTbaRating(loser.getTbaRating() - change);
        userRepository.save(loser);
    }

    public double calculateChange(double winnerRating, double loserRating){
        double difference = loserRating - winnerRating;
        double predictedOutcome = 1 / (1 + pow(10, (difference) / 400));
        return 32 * (1 - predictedOutcome);

    }

    public List<UserPair> getTopTen(String game){
        String gameName = game + "Rating";
        List<UserPair> temp = new ArrayList<>();
        List<User> users = userRepository.findAll(Sort.by(DESC, gameName));
        for(int i = 0; i < 10 && i < users.size(); i++) {
            switch (game) {
                case "wordle":
                    temp.add(new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getWordleRating()));
                    break;
                case "anagram":
                    temp.add(new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getAnagramRating()));
                    break;
                case "tba":
                    temp.add(new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getTbaRating()));

                    break;
                default:
                    break;
            }
        }
        return temp;
    }

    public UserPair getRank(String username, String game){
        String gameName = game + "Rating";

        List<User> users = userRepository.findAll(Sort.by(DESC, gameName));
        for(int i = 0;i < users.size(); i++){
            if(users.get(i).getUsername().equals(username)){
                switch (game) {
                    case "wordle":
                        return new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getWordleRating());
                    case "anagram":
                        return new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getAnagramRating());
                    case "tba":
                        return new UserPair(i + 1, users.get(i).getUsername(), users.get(i).getTbaRating());
                }

            }
        }
        return new UserPair(-1, username, 0);
    }

    public boolean checkUsername(String username) {

        return userRepository.existsByUsername(username);
    }




}
