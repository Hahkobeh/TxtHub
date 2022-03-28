
package com.txthub.wordle;

import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import com.txthub.wordle.wordlelogic.WordleService;
import com.txthub.wordle.wordlelogic.WordleController;


@SpringBootTest
class WordleApplicationTests{

// Should be noted that the constructor for wordleService, wordleApplication, and the method getLineCountTest either needs to be changed to 
// public or the tests need to be performed inside "WordleService.java". These are the only ways around this situation.

	/*----------------------------------- Testing Wordle Services---------------------------------------------- */

	//Testing constructor WordleService()
	@Test
	void wordleServiceContstructor(){
		WordleService wordletest = new WordleService();
		assertFalse(wordletest == null, "The constructor has been successfully made.");
	}
	//Testing method for getLineCountTest()
	@Test
	void getLineCountTest0(){
		int expectedLines = 5757;
		WordleService wordletest = new WordleService();
		assertEquals(expectedLines, wordletest.getLineCount(), "Wordle function: getLineCountTest() return 5757 Lines, Expected result: 5757 Lines.");		
	}

	//Testing method for getWordTest()
	@Test
	void getWordTest(){
		String wordThatIsNotInFile = "Soare";
		WordleService wordletest = new WordleService();
		assertFalse(wordThatIsNotInFile == wordletest.getWord(), "Wordle function: getWord() returns random word, Expected result: Not Soare.");
	}

	//Testing method for checkIfValidTest()
	@Test
	void checkIfValidTest(){
		String match = "match";
		WordleService wordletest = new WordleService();
		assertTrue(wordletest.checkIfValid(match), "Test on checkIfValidTest did not work.");
	}


	/*----------------------------------- Testing Wordle Controllers---------------------------------------------- */
	//Testing Constructor WordleController
	@Test
	void wordleControllerTest(){
		WordleService wordleServiceTest = new WordleService();
		WordleController wordleControllerTest = new WordleController(wordleServiceTest);
		assertFalse(wordleControllerTest == null,"The wordle controller class constructor has not been created.");
	}
	//Testing method wordRequest
	@Test
	void wordRequestTest(){
		WordleService wordleServiceTest = new WordleService();
		WordleController wordleControllerTest = new WordleController(wordleServiceTest);
		String wordTest = wordleControllerTest.wordRequest();
		assertTrue(wordTest.length() == 5, "The word returned is not found in the file.");
	}

	//Testing method validWordTest()
	@Test
	void validWordTest(){
		WordleService wordleServiceTest = new WordleService();
		WordleController wordleControllerTest = new WordleController(wordleServiceTest);
		String wordTest = "talon";
		assertTrue(wordleControllerTest.validWord(wordTest), "This is not a valid 5 letter word.");
	}
}


