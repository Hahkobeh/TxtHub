package com.txthub.wordle.wordlelogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Random;
import java.util.Scanner;

@Service
public class WordleService {

    private File wordleFile;
    private int fileLength;

    @Autowired
    public WordleService(){
        try {
            this.wordleFile = new File("wordleWords.txt");
            System.out.println(wordleFile.getAbsolutePath());
            assert (this.wordleFile.setReadOnly());
            this.fileLength = getLineCount();


        }catch (NullPointerException e) {
            System.out.println("null ptr");
            System.exit(-1);
        }
    }

    public int getLineCount(){
        int count = 0;
        try {
            Scanner scanner = new Scanner(this.wordleFile);
            while(scanner.hasNext()){
                count++;
                scanner.next();
            }
            scanner.close();
        }catch (FileNotFoundException e){
            System.out.println("File not found");
            System.exit(-1);
        }
        return count;
    }

    public String getWord(){
        try {
            Scanner scanner = new Scanner(this.wordleFile);

            int count = 0;
            int num = getRandomNumber();

            while (scanner.hasNext()) {
                if(count == num) {
                    return scanner.next();
                }
                scanner.next();
                count++;
            }

            scanner.close();
        }catch (FileNotFoundException e){
            System.err.println("File not found when getting word");
        }


        return null;
    }

    private int getRandomNumber(){
        Random rand = new Random();
        return rand.nextInt(this.fileLength);
    }

    public boolean checkIfValid(String word){
        try{
            Scanner scanner = new Scanner(this.wordleFile);
            while(scanner.hasNext()){
                String temp = scanner.next();
                if(temp.equals(word)){
                    return true;
                }

            }
            scanner.close();

        }catch (FileNotFoundException e){
            System.err.println("File not found when scanning for valid word");
        }
        return false;
    }


}
