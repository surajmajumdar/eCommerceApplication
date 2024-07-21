package com.suraj.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suraj.ecommerce.model.UserDetails;
import com.suraj.ecommerce.response.ForgotPasswordMessage;
import com.suraj.ecommerce.response.LoginMessage;
import com.suraj.ecommerce.service.UserDetailsService;
import com.suraj.ecommmerce.dto.ForgotPasswordDTO;
import com.suraj.ecommmerce.dto.LoginUserDTO;

@RestController
@RequestMapping("/userDetails")
@CrossOrigin
public class UserDetailsController {
	@Autowired
	private UserDetailsService userDetailsService;
	
	//post request to add a user
	@PostMapping("/addUser")
	public String add(@RequestBody UserDetails userDetails) {
		userDetailsService.saveUserDetails(userDetails);
		return "redirect/home";
	}
	
	//get request to get details of all users
	@GetMapping("/getAllUsers")
	public List<UserDetails> getAllUsers(){
		return userDetailsService.getAllUsers();
	}
	
	//get request to get details of a particular user
	@GetMapping("/getUser/{id}")
	public UserDetails findUserById(@PathVariable int id) {
		return userDetailsService.getUserById(id);
	}
	
	//put request to update user details
	@PutMapping("/updateUser")
	public UserDetails updateUser(@RequestBody UserDetails userDetails) {
		return userDetailsService.updateUser(userDetails);
	}
	
	//post request to return response after validating the login details
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDTO)
    {
        LoginMessage loginMessage = userDetailsService.loginUser(loginUserDTO);
        return ResponseEntity.ok(loginMessage);
    }
	
	//post mapping to return response after validating the forgot password details
	@PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO)
    {
        ForgotPasswordMessage forgotPasswordMessage = userDetailsService.forgotPassword(forgotPasswordDTO);
        return ResponseEntity.ok(forgotPasswordMessage);
    }
	
	//put mapping to update password after resetting it
	@PutMapping("/resetPassword/{email}/{password}")
	public UserDetails resetPassword(@PathVariable String email, @PathVariable String password) {
		return userDetailsService.resetPassword(email, password);
	}

	
	
}
