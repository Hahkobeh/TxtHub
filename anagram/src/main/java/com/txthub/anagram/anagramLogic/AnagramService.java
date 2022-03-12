package com.txthub.anagram.anagramLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Random;
import java.util.Scanner;


@Service
public class AnagramService {

    private File anagramFile;
    private int fileLength; 


    @Autowired
    AnagramService(){
        try {
            this.anagramFile = new File("words.txt");
            System.out.println(anagramFile.getAbsolutePath());
            assert (this.anagramFile.setReadOnly());
            this.fileLength = getLineCount();


        }catch (NullPointerException e) {
            System.out.println("null ptr");
            System.exit(-1);
        }
    }


    private int getLineCount() {
        int count = 0;
        try {
            Scanner scanner = new Scanner(this.anagramFile);
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
            Scanner scanner = new Scanner(this.anagramFile);

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
            Scanner scanner = new Scanner(this.anagramFile);
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
