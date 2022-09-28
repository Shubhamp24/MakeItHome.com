package com.app.dto;

import javax.validation.constraints.NotNull;

import com.app.pojos.Cart;
import com.app.pojos.Product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartItemDTO {

	private Long id;

	@NotNull
	private Long quantity;

	@NotNull
	private Product product;

	public CartItemDTO() {
	}

	public CartItemDTO(Cart cart) {
		this.setId(cart.getId());
		this.setQuantity(cart.getQuantity());
		this.setProduct(cart.getProduct());
	}

}
