package com.app.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.PaymentDetailsDTO;
import com.app.pojos.OrderItem;
import com.app.pojos.OrderStatus;
import com.app.pojos.Payment;
import com.app.repository.OrderItemRepository;
import com.app.repository.PaymentRepository;
import com.app.service.email.IEmailSenderService;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class PaymentServiceImpl implements IPaymentService {

	@Autowired
	private PaymentRepository paymentRepo;

	@Autowired
	private OrderItemRepository orderItemRepo;

	@Autowired
	private IEmailSenderService emailService;

	@Override
	public void savePayment(PaymentDetailsDTO paymentDTO) {
		Payment payment = paymentRepo.findByRazorPayOrderId(paymentDTO.getRazorpay_order_id());
		payment.setRazorPayPaymentId(paymentDTO.getRazorpay_payment_id());
		payment.setPayementStatus("PAID");
		payment.getOrderId().setStatus(OrderStatus.PENDING);
		List<OrderItem> orderItems = orderItemRepo.findByOrder(payment.getOrderId());

		String subject = "Order #" + paymentDTO.getRazorpay_order_id();
		String template = "order-template";
		Map<String, Object> model = new HashMap<>();
		model.put("orderId", paymentDTO.getRazorpay_order_id());
		model.put("name", payment.getOrderId().getUser().getFirstName());
		model.put("fullname",
				payment.getOrderId().getUser().getFirstName() + " " + payment.getOrderId().getUser().getLastName());
		model.put("orderDate", LocalDate.now());
		model.put("address", payment.getOrderId().getShippingAddress());
		model.put("orderItems", orderItems);
		model.put("mobileNo", payment.getOrderId().getUser().getPhoneNumber());
		model.put("totalPrice", payment.getOrderId().getTotalPrice());
		try {
			emailService.sendMail(payment.getOrderId().getUser().getEmail(), subject, template, model);
		} catch (MessagingException e) {
			log.info("Error Occured While Sending Email!!!");
		}

	}

}
