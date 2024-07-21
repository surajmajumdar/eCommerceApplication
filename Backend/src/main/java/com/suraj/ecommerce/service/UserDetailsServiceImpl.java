package com.suraj.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suraj.ecommerce.model.UserDetails;
import com.suraj.ecommerce.repository.UserDetailsRepository;
import com.suraj.ecommerce.response.ForgotPasswordMessage;
import com.suraj.ecommerce.response.LoginMessage;
import com.suraj.ecommmerce.dto.ForgotPasswordDTO;
import com.suraj.ecommmerce.dto.LoginUserDTO;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
		
	@Autowired
	private UserDetailsRepository userDetailsRepository;

	//method to save user details
	@Override
	public UserDetails saveUserDetails(UserDetails userDetails) {
		return userDetailsRepository.save(userDetails);
	}

	//method to get all user details
	@Override
	public List<UserDetails> getAllUsers() {
		return userDetailsRepository.findAll();
	}
	
	//method to get details of a particular user
	@Override
	public UserDetails getUserById(int userId) {
		return userDetailsRepository.findById(userId).orElse(null);
	}
	
	//method to update the user details
	@Override
	public UserDetails updateUser(UserDetails userDetails) {
		UserDetails existingUser=userDetailsRepository.findById(userDetails.getUserId()).orElse(null);
		existingUser.setAccountType(userDetails.getAccountType());
		existingUser.setFirstName(userDetails.getFirstName());
		existingUser.setLastName(userDetails.getLastName());
		existingUser.setMobileNo(userDetails.getMobileNo());
		existingUser.setDob(userDetails.getDob());
		existingUser.setEmail(userDetails.getEmail());
		existingUser.setPassword(userDetails.getPassword());
		existingUser.setPetName(userDetails.getPetName());
		return userDetailsRepository.save(existingUser);

	}
	
	//method to update password after resetting
	@Override 
	public UserDetails resetPassword(String email, String password) {
		UserDetails existingUser = userDetailsRepository.findByEmail(email);
		existingUser.setPassword(password);
		return userDetailsRepository.save(existingUser);
	}

	//method to check if the user exists in the database and validating the login request
	@Override
	public LoginMessage loginUser(LoginUserDTO loginUserDTO) {
        UserDetails user1 = userDetailsRepository.findByEmail(loginUserDTO.getEmail());
        if (user1 != null) {
            String passwordEntered = loginUserDTO.getPassword();
            String passwordFromDatabase = user1.getPassword();
            if (passwordEntered.equals(passwordFromDatabase)) {
                Optional<UserDetails> user = userDetailsRepository.findOneByEmailAndPassword(loginUserDTO.getEmail(), passwordFromDatabase);
                if (user.isPresent()) {
                    return new LoginMessage("Login Success", true, user1.getUserId());
                } else {
                    return new LoginMessage("Login Failed", false, -1);
                }
            } else {
                return new LoginMessage("Password does not Match", false, -1);
            }
        }else {
            return new LoginMessage("Email does not exists", false, -1);
        }
		
	}

	//method to validate forgot password credentials i.e. email and security question (pet name)
	@Override
	public ForgotPasswordMessage forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
		UserDetails user1 = userDetailsRepository.findByEmail(forgotPasswordDTO.getEmail());
        if (user1 != null) {
            String petNameEntered = forgotPasswordDTO.getPetName();
            String petNameFromDatabase = user1.getPetName();
            if (petNameEntered.equals(petNameFromDatabase)) {
            	return new ForgotPasswordMessage("User Found", true);
            } else {
                return new ForgotPasswordMessage("Pet name does not Match", false);
            }
        }else {
            return new ForgotPasswordMessage("Email does not exists", false);
        }
	}
	

}