package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Order;
import com.app.pojos.UserEntity;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUser(UserEntity user);

	List<Order> findAllByUserOrderByOrderTimeDesc(UserEntity user);

	@Query("SELECT o FROM Order o WHERE o.status='PENDING'")
	List<Order> findAllPendingOrders();

	@Query("SELECT o FROM Order o WHERE o.status='SHIPPED'")
	List<Order> findAllShippedOrders();

	@Query("SELECT o FROM Order o WHERE o.status='CANCELLED'")
	List<Order> findAllCancelledOrders();

	@Query("SELECT o FROM Order o ORDER BY o.orderTime DESC")
	List<Order> findAllByOrderTimeDesc();

}
