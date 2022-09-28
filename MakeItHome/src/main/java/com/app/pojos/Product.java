package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product extends BaseEntity {
	@Column(name = "product_name", length = 100)
	private String productName;
	@Column(name = "product_description", length = 500)
	private String productDescription;
	@Column(name = "price")
	private double price;
	@Column(name = "stock")
	private int stock;
	@Column(name = "image_path")
	private String imagePath;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category categoryId;

	public Product(String productName, String productDescription, double price, int stock, String imagePath,
			Category categoryId) {
		super();
		this.productName = productName;
		this.productDescription = productDescription;
		this.price = price;
		this.stock = stock;
		this.imagePath = imagePath;
		this.categoryId = categoryId;
	}

	@Override
	public String toString() {
		return "Product [productName=" + productName + ", productDescription=" + productDescription + ", price=" + price
				+ ", stock=" + stock + ", imagePath=" + imagePath + "]";
	}

}
