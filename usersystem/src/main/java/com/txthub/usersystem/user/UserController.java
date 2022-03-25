package com.txthub.usersystem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "user/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    @ResponseBody
    public boolean test(){
        System.out.println("Testing system");
        return true;
    }



    //Returns all user info on successful login, otherwise null (nothing)
    @PostMapping("/login")
    @ResponseBody
    public User login(@RequestBody UserForm userForm){
        System.out.println("Login request received");
        return userService.login(userForm.getUsername(), userForm.getPassword());
    }

    //True on successful registration, false otherwise
    @PostMapping("/register")
    @ResponseBody
    public boolean register(@RequestBody UserForm userForm){
        System.out.println("Create request received");
        return userService.createUser(userForm.getUsername(), userForm.getPassword());
    }

    //returns user with updated password, null on unsuccessful
    @PutMapping("/changepassword")
    @ResponseBody
    public User changePassword(@RequestBody UserForm userForm){
        return userService.changePassword(userForm.getId(), userForm.getPassword());
    }

    //returns user with updated username, null on unsuccessful
    @PutMapping("/changeusername")
    @ResponseBody
    public User changeUsername(@RequestBody UserForm userForm){
        return userService.changeUsername(userForm.getId(), userForm.getUsername());
    }

    //return true on successful deletion, false otherwise
    @DeleteMapping("/deleteaccount")
    @ResponseBody
    public boolean deleteAccount(@RequestBody UserForm userForm){
        return userService.deleteAccount(userForm.getId());
    }

    @PutMapping("/update/{game}/{winner}/{loser}")
    @ResponseBody
    public boolean updateRating(@PathVariable String game, @PathVariable String winner, @PathVariable String loser){
        return userService.updateRating(game, winner, loser);
    }

    @GetMapping("/leaders/{game}")
    @ResponseBody
    public List<UserPair> getLeaders(@PathVariable String game){
        return userService.getTopTen(game);


    }

    @GetMapping("/exists/{username}")
    @ResponseBody
    public boolean checkUsername(@PathVariable String username){
        return userService.checkUsername(username);

    }

    @GetMapping("/rank/{username}/{game}")
    @ResponseBody
    public UserPair getRank(@PathVariable String username, @PathVariable String game){
        return userService.getRank(username, game);
    }



}
