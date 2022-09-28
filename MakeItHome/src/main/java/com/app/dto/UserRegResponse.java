package com.app.dto;

import com.app.pojos.UserEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegResponse {

	private String message;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;

	public UserRegResponse(UserEntity user) {
		super();
		this.message = "User Successfully Registered with following Details";
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.phoneNumber=user.getPhoneNumber();
	}

}
