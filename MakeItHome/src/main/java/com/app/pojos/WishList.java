package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "wishlist")
@Getter
@Setter
@ToString
public class WishList extends BaseEntity {

	@OneToOne
	@JoinColumn(nullable = false, name = "user_id")
	private UserEntity user;

	@Column(name = "created_date")
	private LocalDate createdDate;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	public WishList() {
	}

	public WishList(UserEntity user, Product product) {
		this.user = user;
		this.product = product;
		this.createdDate = LocalDate.now();
	}

}
