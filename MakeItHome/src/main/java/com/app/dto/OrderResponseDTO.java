package com.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.app.pojos.OrderItem;

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
public class OrderResponseDTO {
	private Long id;
	
	private String razorPayOrder;

	private double totalPrice;

	private LocalDateTime orderTime;

	private List<OrderItem> orderItems;

	private String status;

	private Long userId;

	private String userEmail;
	
	private String shippingAddress;

	
	
}
