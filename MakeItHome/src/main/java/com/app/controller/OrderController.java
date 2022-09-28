package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderRequestDTO;
import com.app.dto.PaymentDetailsDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.pojos.Order;
import com.app.repository.OrderItemRepository;
import com.app.service.IOrderService;
import com.app.service.IPaymentService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/orders")
public class OrderController {

	@Autowired
	private IOrderService orderService;

	@Autowired
	private OrderItemRepository orderItemRepo;
	
	@Autowired
	private IPaymentService paymentService;

	@Autowired
	private JwtUtils utils;

	
	@PostMapping("/create")
	public String createOrder(@RequestBody OrderRequestDTO orderData, @RequestHeader("Authorization") String token)
			throws Exception {
		// System.out.println("Hey order function ex.");
		System.out.println(orderData);
		return orderService.createOrder(orderData, utils.getUserNameFromJwtToken(token.substring(7)));
	}
	
	@PostMapping("/razorpayment")
		public String rp(@RequestBody PaymentDetailsDTO paymentDTO) {
			System.out.println(paymentDTO);
			paymentService.savePayment(paymentDTO);
			return "Your order has been placed successfully!!!";
		}

	// get all orders
	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String token) {
		return new ResponseEntity<>(orderService.listOrders(utils.getUserNameFromJwtToken(token.substring(7))),
				HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOrderById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(orderService.getOrderById(id));

	}

	@GetMapping("/orderdetails/{orderId}")
	public ResponseEntity<?> getOrderDetailsByOrderId(@PathVariable("orderId") Long id) {
		return ResponseEntity.ok(orderItemRepo.findByOrder(orderService.getOrderById(id)));
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUserOrdersById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(orderService.getUserOrdersById(id));
	}

	@PutMapping("/user/cancelorder/{orderId}")
	public String cancelOrder(@PathVariable("orderId") Long id) {
		orderService.cancelOrder(id);
		return "Order has been cancelled";
	}

}
