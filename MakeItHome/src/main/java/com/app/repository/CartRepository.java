package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Cart;
import com.app.pojos.Product;
import com.app.pojos.UserEntity;

public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findAllByUserOrderByCreatedDateDesc(UserEntity user);
	
	List<Cart> findAllByUser(UserEntity user);

	Cart findByUserAndProduct(UserEntity user, Product product);

	List<Cart> deleteByUser(UserEntity user);

}
