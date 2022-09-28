package com.app.dto;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddressDTO {

	private Long id;

	@NotBlank(message = "House No. should not be blank")
	private String houseNo;

	@NotBlank(message = "Street should not be blank")
	private String street;

	@NotBlank(message = "City should not be blank")
	private String city;

	@NotBlank(message = "State should not be blank")
	private String state;

	@NotBlank(message = "Country should not be blank")
	private String country;

	@NotBlank(message = "Zipcode should not be blank")
	@Length(max = 6, min = 6, message = "Zipcode length should be 6")
	private String zipCode;
}
