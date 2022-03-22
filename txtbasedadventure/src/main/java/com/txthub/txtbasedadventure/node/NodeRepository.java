package com.txthub.txtbasedadventure.node;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NodeRepository extends MongoRepository<Node, String> {

    List<Node> findByStoryId(String storyId);
}

