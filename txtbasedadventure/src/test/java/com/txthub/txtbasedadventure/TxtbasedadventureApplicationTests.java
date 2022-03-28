package com.txthub.txtbasedadventure;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.txthub.txtbasedadventure.node.Node;
import com.txthub.txtbasedadventure.node.NodeRepository;
import com.txthub.txtbasedadventure.story.Story;
import com.txthub.txtbasedadventure.story.StoryRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TxtbasedadventureApplicationTests {

	@Test
	void contextLoads() {
	}
//---------------------Node Tests--------------------------------//


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


//--------------------Node Service--------------------------------//
	//How does this full connect to the repository?????
	NodeRepository nodeRepository;


//---------------------Story Tests-------------------------------//
	@Test
	void StoryConstructor6ArgsTest(){
		String id = "0001";
		String name = "matt's story";
		String username = "matthew";
		String genre = "Mystery";
		int likes = 0;
		int dislikes = 1;
		Story story = new Story(id, name, username, genre, likes, dislikes);

		assertTrue(story != null, "This story has not been created");
	}

	@Test
	void StoryConstructor3ArgsTest(){
		String name = "giving tree";
		String authorName = "matthew";
		String genre = "Action";
		Story story = new Story(name, authorName, genre);

		assertTrue(story != null, "This story has not been created.");
	}

//-----------------Story Repository------------------------------//

	StoryRepository storyRepo;
	
	@Test
	void CreateStoryTest(){

	}
}
