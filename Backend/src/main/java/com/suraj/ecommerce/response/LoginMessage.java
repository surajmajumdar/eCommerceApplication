package com.suraj.ecommerce.response;

//object to handle the login message response
public class LoginMessage {
	
	String message;
	Boolean status;
	int userId = -1;
	
	public LoginMessage(String message, Boolean status, int userId) {
		super();
		this.message = message;
		this.status = status;
		this.userId = userId;
		
	}
	
	public LoginMessage() {
		
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "LoginMessage [message=" + message + ", status=" + status + ", userId=" + userId + "]";
	}
	

}
