package com.suraj.ecommerce.service;

import java.util.List;

import com.suraj.ecommerce.model.UserDetails;
import com.suraj.ecommerce.response.ForgotPasswordMessage;
import com.suraj.ecommerce.response.LoginMessage;
import com.suraj.ecommmerce.dto.ForgotPasswordDTO;
import com.suraj.ecommmerce.dto.LoginUserDTO;

//interface of user details service
public interface UserDetailsService {
	public UserDetails saveUserDetails(UserDetails userDetails);
	public List<UserDetails> getAllUsers();
	public LoginMessage loginUser(LoginUserDTO loginUserDTO);
	UserDetails getUserById(int userId);
	UserDetails updateUser(UserDetails userDetails);
	public ForgotPasswordMessage forgotPassword(ForgotPasswordDTO forgotPasswordDTO);
	UserDetails resetPassword(String email, String password);

}
