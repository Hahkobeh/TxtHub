package com.txthub.txtbasedadventure;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.txthub.txtbasedadventure.node.Node;
import com.txthub.txtbasedadventure.node.NodeRepository;
import com.txthub.txtbasedadventure.node.NodeService;
import com.txthub.txtbasedadventure.story.Genre;
import com.txthub.txtbasedadventure.story.Story;
import com.txthub.txtbasedadventure.story.StoryForm;
import com.txthub.txtbasedadventure.story.StoryRepository;
import com.txthub.txtbasedadventure.story.StoryService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TxtbasedadventureApplicationTests {

	@Test
	void contextLoads() {
	}
//---------------------Node Tests--------------------------------//
	NodeRepository nodeRepository;
	NodeService newNodeService = new NodeService(nodeRepository);
	StoryRepository storyRepo;
	StoryService storyService = new StoryService(storyRepo);

	@Test
	void NodeConstructor1ArgTest(){
		String id = "0001";
		Node node = new Node(id);
		assertTrue(node != null, "This node could not be tied to any story.");
	}

	@Test
	void NodeConstructor2ArgsTest(){
		String id ="0001";
		String storyId = "0001";
		Node node = new Node(id, storyId);
		assertTrue(node != null, "This node could not be tied to any story.");
	}

	@Test
	void CreateandDeleteNodesTest(){
		String id = "0001";
		String name = "Gatsby";
		String authorUsername = "Fitz Gerald";
		String genre = "MYSTERY";
		int likes = 0;
		int dislikes = 0;

		Story dud = new Story(id, name, authorUsername, genre, likes, dislikes);
		storyRepo.save(dud);

		newNodeService.createFirstNode("0002", id);
		assertTrue(newNodeService.createNode(id) != null, "The node failed to be created.");
		storyService.deleteStory(id);
	}

	@Test
	void getNodesTest(){
		String id = "0001";
		String name = "Gatsby";
		String authorUsername = "Fitz Gerald";
		String genre = "MYSTERY";
		int likes = 0;
		int dislikes = 0;

		Story dud = new Story(id, name, authorUsername, genre, likes, dislikes);
		storyRepo.save(dud);
		newNodeService.createFirstNode("0002", id);
		newNodeService.createNode(id);
		newNodeService.deleteAllStoryNodes(id);
		assertTrue( newNodeService.getStoryNodes(id) != null, "The get story nodes failed to work. ");
		storyService.deleteStory(id);
	}

//---------------------Story Tests-------------------------------//
	@Test
	void StoryConstructor6ArgsTest(){
		String id = "0001";
		String name = "matt's story";
		String username = "matthew";
		String genre = "MYSTERY";
		int likes = 0;
		int dislikes = 1;
		Story story = new Story(id, name, username, genre, likes, dislikes);

		assertTrue(story != null, "This story has not been created");
	}

	@Test
	void StoryConstructor3ArgsTest(){
		String name = "giving tree";
		String authorName = "matthew";
		String genre = "ACTION";
		Story story = new Story(name, authorName, genre);

		assertTrue(story != null, "This story has not been created.");
	}
//--------------------Story Service Test---------------------------//


	@Test
	void getAllStoryTest(){
		assertTrue(storyService.getAllStories() != null, "All stories can not be obtained.");
	}

	@Test
	void getStoriesByLikesTest(){
		assertTrue(storyService.getStoriesByLikes() != null, "Stories by likes can not be obtained.");
	}

	@Test
	void FindAuthorandDeleteStoryTest(){

		String id = "0001";
		String name = "Gatsby";
		String authorUsername = "Fitz Gerald";
		String genre = "MYSTERY";
		int likes = 0;
		int dislikes = 0;

		Story dud = new Story(id, name, authorUsername, genre, likes, dislikes);
		storyRepo.save(dud);
		storyService.deleteStory(id);
		assertTrue(storyService.getStoriesByAuthor(authorUsername) == null, "This has not been successfully deleted.");
	}
}
