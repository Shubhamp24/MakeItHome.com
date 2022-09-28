package com.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.InvalidIdException;
import com.app.dto.CartDTO;
import com.app.dto.CartItemDTO;
import com.app.dto.OrderRequestDTO;
import com.app.pojos.Address;
import com.app.pojos.Order;
import com.app.pojos.OrderItem;
import com.app.pojos.OrderStatus;
import com.app.pojos.Payment;
import com.app.pojos.UserEntity;
import com.app.repository.OrderItemRepository;
import com.app.repository.OrderRepository;
import com.app.repository.PaymentRepository;
import com.app.repository.UserRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private OrderRepository orderRepo;

	@Autowired
	private ICartService cartService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private OrderItemRepository orderItemRepo;

	@Autowired
	private PaymentRepository paymentRepo;

	@Override
	public List<Order> listOrders(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid Email"));
		return orderRepo.findAllByUserOrderByOrderTimeDesc(user);
	}

	@Override
	public Order getOrderById(Long id) {
		return orderRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Order Id"));
	}

	@Override
	public List<Order> listOrders() {
		return orderRepo.findAllByOrderTimeDesc();
	}

	@Override
	public List<Order> listPendingOrders() {
		return orderRepo.findAllPendingOrders();
	}

	@Override
	public List<Order> listShippedOrders() {
		return orderRepo.findAllShippedOrders();
	}

	@Override
	public List<Order> listCancelledOrders() {
		return orderRepo.findAllCancelledOrders();
	}

	@Override
	public void approveOrder(Long id) {
		Order order = orderRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Order Id"));
		order.setStatus(OrderStatus.SHIPPED);
	}

	@Override
	public void cancelOrder(Long id) {
		Order order = orderRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Order Id"));
		order.setStatus(OrderStatus.CANCELLED);
	}

	@Override
	public List<Order> getUserOrdersById(Long id) {
		return orderRepo.findAllByUserOrderByOrderTimeDesc(
				userRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid User Id")));
	}

	@Override
	public String createOrder(OrderRequestDTO orderData, String email) throws RazorpayException {

		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid User"));
		CartDTO cartDTO = cartService.listCartItems(email);
		List<CartItemDTO> cartItems = cartDTO.getCartItems();
		if (cartItems.size() == 0)
			throw new RuntimeException("Nothing To Order!!!");

		// create the order and save it

		Order newOrder = new Order();
		newOrder.setOrderTime(LocalDateTime.now());
		newOrder.setStatus(OrderStatus.CREATED);
		newOrder.setTotalPrice(cartDTO.getTotalCost());
		newOrder.setUser(user);
		Order order = orderRepo.save(newOrder);
		for (CartItemDTO cartItem : cartItems) {
			OrderItem orderItem = new OrderItem();
			orderItem.setCreatedDate(LocalDate.now());
			orderItem.setOrder(order);
			orderItem.setPrice(cartItem.getProduct().getPrice());
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			// add to order item list
			orderItemRepo.save(orderItem);
			cartItem.getProduct().setStock((int) (cartItem.getProduct().getStock() - cartItem.getQuantity()));
		}
		cartService.deleteUserCartItems(user);

		Address address = new Address(orderData.getHouseNo(), orderData.getStreet(), orderData.getCity(),
				orderData.getState(), orderData.getCountry(), orderData.getZipCode());
		order.setShippingAddress(address.toString());

		double amt = cartDTO.getTotalCost();
		var client = new RazorpayClient("rzp_test_xiN8F3GDUmFAGY", "rQJcNiDjKaRQOgySu3fhg1IS");
		Random rnd = new Random();
		int txn = rnd.nextInt(999999999);

		JSONObject ob = new JSONObject();
		ob.put("amount", amt * 100);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_" + txn);

		com.razorpay.Order rz_order = client.Orders.create(ob);
		System.out.println(rz_order);

		String id = rz_order.get("id");
		order.setRazorPayOrderId(id);

		Payment payment = new Payment(amt, "txn_" + txn, null, order, id);
		paymentRepo.save(payment);

		return rz_order.toString();
	}

}
