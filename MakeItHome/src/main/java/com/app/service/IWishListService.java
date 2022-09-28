package com.app.service;

import java.util.List;

import com.app.pojos.Product;
import com.app.pojos.WishList;

public interface IWishListService {

	List<WishList> getWishList(String email);

	void createWishlist(Product product, String email);

	void deleteFromWishlist(Long id);

	void clearWishList(String email);

}
