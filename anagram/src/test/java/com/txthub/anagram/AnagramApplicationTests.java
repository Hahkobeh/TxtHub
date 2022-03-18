package com.txthub.anagram;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.txthub.anagram.anagramLogic.AnagramController;
import com.txthub.anagram.anagramLogic.AnagramService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class AnagramApplicationTests {

	public AnagramService testService = new AnagramService();
	public AnagramController testController = new AnagramController(testService); 

	@Test
	void testTests(){
		int i = 0; 
		assertEquals( 0, i, "Testing"); 
	}

	//testing anagramservice.java getWord
	@Test
	void getWordTest(){
		String word = testService.getWord(); 
		assertTrue(testController.validWord(word)); 
	}

	//testing anagramservice.java checkIfValid
	@Test
	void checkIfValidTest(){
		String word = "which"; 
		assertTrue(testService.checkIfValid(word)); 
	}

	//testing AnagramController.java wordRequest
	@Test
	void wordRequestTest(){
		String word = testController.wordRequest(); 
		assertTrue(testController.validWord(word));
	}

	//testing AnagramController.java validWord
	@Test
	void validWordTestbeg(){
		String word = "which"; 
		assertTrue(testController.validWord(word));
	}

	//testing AnagramController.java validWord
	@Test
	void validWordTestend(){
		String word = "pupal"; 
		assertTrue(testController.validWord(word));
	}
}
