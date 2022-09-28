package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.app.pojos.Role;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "role")
public class UserDTO {
	private Long id;
	@NotBlank(message = "user's first name must be supplied")
	@Length(min = 4, max = 30, message = "Invalid First name length")
	private String firstName;
	@NotBlank(message = "user's last name must be supplied")
	@Length(min = 4, max = 30, message = "Invalid Last name length")
	private String lastName;
	@NotBlank(message = "email must be supplied")
	@Email(message = "Invalid Email")
	private String email;
	@NotBlank(message = "password must be supplied")
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Password should have alphanumeric values & at least 1 special character")
	private String password;
	@NotBlank(message = "password must be supplied")
	private String confirmPassword;// check validation later
	@NotBlank(message = "Enter phone number")
	@Length(min = 10, max = 10)
	private String phoneNumber;
	private Role role = Role.CUSTOMER;

}
