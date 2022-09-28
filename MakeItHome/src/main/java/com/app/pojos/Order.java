package com.app.pojos;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order extends BaseEntity {
	@Column(name = "total_price")
	private double totalPrice;
	@Column(name = "order_time")
	private LocalDateTime orderTime;
	@OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
	private List<OrderItem> orderItems;
	
	@Column(name="razorpay_orderId")
	private String razorPayOrderId;

	@Column(name = "status", length = 30)
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	@ManyToOne()
	@JsonIgnore
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private UserEntity user;
	
	@Column(name="shipping_address",length = 500)
	private String shippingAddress;

	public Order(double totalPrice, LocalDateTime orderTime, OrderStatus status, UserEntity user) {
		super();
		this.totalPrice = totalPrice;
		this.orderTime = LocalDateTime.now();
		this.status = status;
		this.user = user;
	}

	@Override
	public String toString() {
		return "Order [totalPrice=" + totalPrice + ", orderTime=" + orderTime + ", orderItems=" + orderItems
				+ ", status=" + status + ", user=" + user + "]";
	}

}
