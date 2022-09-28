package com.app.service;

import java.util.List;

import com.app.dto.OrderRequestDTO;
import com.app.pojos.Order;
import com.razorpay.RazorpayException;

public interface IOrderService {

	List<Order> listOrders(String email);

	Order getOrderById(Long id);

	List<Order> listOrders();

	void approveOrder(Long id);

	List<Order> listPendingOrders();

	List<Order> listShippedOrders();

	List<Order> listCancelledOrders();

	void cancelOrder(Long id);

	List<Order> getUserOrdersById(Long id);

	String createOrder(OrderRequestDTO orderData, String email) throws RazorpayException;
}
