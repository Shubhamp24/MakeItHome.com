package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.InvalidIdException;
import com.app.pojos.Product;
import com.app.pojos.UserEntity;
import com.app.pojos.WishList;
import com.app.repository.UserRepository;
import com.app.repository.WishListRepository;

@Service
@Transactional
public class WishListServiceImpl implements IWishListService {

	@Autowired
	private WishListRepository wishListRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<WishList> getWishList(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new InvalidIdException("Invalid Email"));
		return wishListRepo.findAllByUserOrderByCreatedDateDesc(user);
	}

	@Override
	public void createWishlist(Product product, String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new InvalidIdException("Invalid Email"));
		if (wishListRepo.findByUserAndProduct(user, product) != null) {
			throw new RuntimeException("Already Added in WishList!!!");
		}
		WishList wishList = new WishList(user, product);
		wishListRepo.save(wishList);
	}

	@Override
	public void deleteFromWishlist(Long id) {
		wishListRepo.deleteById(id);
	}

	@Override
	public void clearWishList(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new InvalidIdException("Invalid Email"));
		if (wishListRepo.findAllByUser(user).size() == 0)
			throw new RuntimeException("WishList is Already Empty");
		wishListRepo.deleteAllByUser(user);

	}
}
