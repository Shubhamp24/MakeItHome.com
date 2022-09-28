package com.app.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddToCartDTO {

	private Long id;
	
	@NotNull
	private Long productId;
	@NotNull
	private Long quantity;

	public AddToCartDTO() {
	}

	public AddToCartDTO(Long productId, Long quantity) {
		super();
		this.productId = productId;
		this.quantity = quantity;
	}
}
