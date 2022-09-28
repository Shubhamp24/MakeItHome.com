package com.app.dto;

import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileDTO {

	private String firstName;
	private String lastName;
	@Email(message = "Invalid Email")
	private String email;
	private String phoneNumber;

}
