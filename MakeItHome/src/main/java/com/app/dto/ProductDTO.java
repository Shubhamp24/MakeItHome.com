package com.app.dto;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class ProductDTO {
	private Long id;
	@NotBlank(message = "Product name should bu supplied")
	private String productName;
	@NotBlank(message = "Product Description should bu supplied")
	private String productDescription;
	@Range(min = 1, message = "Invalid price")
	private double price;
	@Range(min = 0, max = 500, message = "Invalid stock")
	private int stock;
	@JsonProperty(access = Access.READ_ONLY) //for serialization only
	private String imagePath;
	private Long categoryId;
}
