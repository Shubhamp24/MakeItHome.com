package com.app.pojos;

import java.time.LocalDate;

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
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Cart extends BaseEntity {

	@Column(name = "created_date")
	private LocalDate createdDate;

	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	private Product product;

	@JsonIgnore
	@OneToOne
	@JoinColumn(nullable = false, name = "user_id")
	private UserEntity user;

	private Long quantity;

	public Cart(Product product, UserEntity user, Long quantity) {
		super();
		this.createdDate = LocalDate.now();
		this.product = product;
		this.user = user;
		this.quantity = quantity;
	}
}
