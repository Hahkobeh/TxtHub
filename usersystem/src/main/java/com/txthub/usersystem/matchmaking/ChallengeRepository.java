package com.txthub.usersystem.matchmaking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends MongoRepository<Challenge, String>{
    
    List<Challenge> findByUsername1(String username);
    List<Challenge> findByUsername2(String username);
    
}
