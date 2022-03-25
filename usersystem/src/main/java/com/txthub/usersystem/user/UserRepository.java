package com.txthub.usersystem.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findByUsername(String username);

    List<User> findByUsernameAndPassword(String username, String password);

    User findByPassword(String password);

    boolean existsByUsername(String username);

}
