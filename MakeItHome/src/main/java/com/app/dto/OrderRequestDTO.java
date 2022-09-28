package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequestDTO {
	
	private Long id;
	private String houseNo;
	private String street;
	private String city;
	private String state;
	private String country;
	private String zipCode;
}
