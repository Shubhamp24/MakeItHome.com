package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryWiseSales {

	private String CategoryName;
	private Long quantity;

	public CategoryWiseSales() {

	}

	public CategoryWiseSales(String categoryName, Long quantity) {
		super();
		CategoryName = categoryName;
		this.quantity = quantity;
	}

}
