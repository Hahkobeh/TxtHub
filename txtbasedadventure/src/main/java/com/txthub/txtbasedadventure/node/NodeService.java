package com.txthub.txtbasedadventure.node;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodeService {
    private final NodeRepository nodeRepository;

    @Autowired
    public NodeService(NodeRepository nodeRepository){
        this.nodeRepository = nodeRepository;
    }
}
