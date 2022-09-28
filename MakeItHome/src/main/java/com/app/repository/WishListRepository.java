package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Product;
import com.app.pojos.UserEntity;
import com.app.pojos.WishList;

public interface WishListRepository extends JpaRepository<WishList, Long> {

	List<WishList> findAllByUserOrderByCreatedDateDesc(UserEntity user);

	WishList findByUserAndProduct(UserEntity user, Product product);

	void deleteAllByUser(UserEntity user);

	List<WishList> findAllByUser(UserEntity user);

}
