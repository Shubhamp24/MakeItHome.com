package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.OrderItem;
import com.app.repository.OrderItemRepository;

@Service
@Transactional
public class OrderItemServiceImpl implements IOrderItemService {

	@Autowired
	private OrderItemRepository orderItemRepo;

	@Override
	public void addOrderedProducts(OrderItem orderItem) {
		orderItemRepo.save(orderItem);
	}
}
