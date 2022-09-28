package com.app.pojos;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class OrderItem extends BaseEntity {
	@Column(name = "quantity")
	private Long quantity;
	@Column(name = "price")
	private double price;
	@Column(name = "created_date")
	private LocalDate createdDate;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	private Order order;
	@OneToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	private Product product;

	public OrderItem(Long quantity, double price, Date createdDate, Order order, Product product) {
		super();
		this.quantity = quantity;
		this.price = price;
		this.createdDate = LocalDate.now();
		this.order = order;
		this.product = product;
	}

}
