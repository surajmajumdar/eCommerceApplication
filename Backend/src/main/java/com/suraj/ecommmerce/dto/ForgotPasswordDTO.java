package com.suraj.ecommmerce.dto;

//DTO for forgot password
public class ForgotPasswordDTO {
	
	private String email;
	private String petName;
	
	public ForgotPasswordDTO(String email, String petName) {
		super();
		this.email = email;
		this.petName = petName;
	}
	
	public ForgotPasswordDTO() {
		
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPetName() {
		return petName;
	}
	public void setpetName(String petName) {
		this.petName = petName;
	}

	@Override
	public String toString() {
		return "ForgotPasswordDTO [email=" + email + ", petName=" + petName + "]";
	}
	

}
