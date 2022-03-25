package com.txthub.usersystem.matchmaking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends MongoRepository<Challenge, String>{
    
    List<Challenge> findByUsername1(String username);
    List<Challenge> findByUsername2(String username);
    Optional<Challenge> findById(String challengeId);
    
}
