package com.txthub.usersystem;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.txthub.usersystem.matchmaking.Challenge;
import com.txthub.usersystem.matchmaking.QueueMember;
import com.txthub.usersystem.user.User;
import com.txthub.usersystem.user.UserPair;

@SpringBootTest
class UsersystemApplicationTests {

	@Test
	void contextLoads() {
	}

//-------------------------------Testing the User-----------------------------------------------------//
	//testing the constructor 'User' with 2 args
	@Test
	void UserConstructor2ArgsTest(){
		String username = "matthew";
		String password = "password";
		User user = new User(username, password);
		
		assertTrue(user != null, "A user has not been created properly.");
	}

	//testing the constructor 'User' with 6 args
	@Test
	void UserConstructor6ArgsTest(){
		ObjectId id = new ObjectId();
		String username = "matthew";
		String password = "password";
		double anagramRating = 400;
		double wordleRating = 500;
		double tbaRating = 200;

		User user = new User(id, username, password, anagramRating, wordleRating, tbaRating);
		assertTrue(user != null, "A user has not been created properly.");

	}

	//testing the default constructor 'User' with no args.
	@Test
	void UserConstructor0ArgsTest(){
		User user = new User();
			assertTrue(user != null, "A user has not been created properly.");
	}
//-------------------------------End of the testing User--------------------------------------------------------//


//-------------------------------Testing the UserController-----------------------------------------------------//
	@Test
	void UserControllerConstructorTest(){

	}
//-------------------------------End of the testing UserController-----------------------------------------------//


//-------------------------------Testing the UserPair------------------------------------------------------------//
	@Test
	void UserPairConstructorTest(){
		int rank = 10;
		String username = "matthew";
		double rating = 10;

		UserPair userPair = new UserPair(rank, username, rating);
		assertTrue(userPair.getRank() == rank, "The rank is not correct.");
		assertTrue(userPair.getUsername() == username, "The username is not correct.");
		assertTrue(userPair.getRating() == rating, "The rating is not correct.");
	}
//-------------------------------End of the UserPair------------------------------------------------------------//

//-------------------------------Testing Challenge------------------------------------------------------------//

	@Test
	void ChallengeConstructor7ArgsTest(){
		String challengeId = "0001";
		String username1 = "matthew";
		String username2 = "selena";
		double score1 = 0;
		double score2 = 1;
		boolean finished = false;
		String game = "wordle";

		Challenge challenge = new Challenge(challengeId, username1, username2, score1, score2, finished, game);

		assertTrue(challenge != null, "The challenge constructor didn't get built.");

	}

	@Test
	void ChallengeConstructor3ArgsTest(){
		String username1 = "matthew";
		String username2 = "selena";
		String game = "anagrams";

		Challenge challenge = new Challenge(username1, username2, game);

		assertTrue(challenge != null, "The challenge constructor didn't get built.");
	}

	@Test
	void QueueMemeberConstructor(){
		String id = "001";
		double rating = 10;
		QueueMember queueMember = new QueueMember(id, rating);

		assertTrue(queueMember != null, "The queue member constructor was not created.");
	}


//-------------------------------End of the Challenge---------------------------------------------------------------//


}
