package com.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartDTO {
	private List<CartItemDTO> cartItems;
	private double totalCost;

	public CartDTO() {
	}

	public CartDTO(List<CartItemDTO> CartItemDTOList, double totalCost) {
		this.cartItems = CartItemDTOList;
		this.totalCost = totalCost;
	}

}
