package com.suraj.ecommerce.response;

//object to handle the forgot password response
public class ForgotPasswordMessage {
	
	String message;
	Boolean status;
	
	public ForgotPasswordMessage(String message, Boolean status) {
		super();
		this.message = message;
		this.status = status;
		
	}
	
	public ForgotPasswordMessage() {
		
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
	
	@Override
	public String toString() {
		return "ForgotPasswordMessage [message=" + message + ", status=" + status + "]";
	}
	

}
