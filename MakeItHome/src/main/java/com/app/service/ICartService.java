package com.app.service;

import com.app.dto.AddToCartDTO;
import com.app.dto.CartDTO;
import com.app.pojos.Cart;
import com.app.pojos.UserEntity;

public interface ICartService {

	Cart addToCart(AddToCartDTO addToCartDTO, String email);

	CartDTO listCartItems(String email);

	void updateCartItem(AddToCartDTO cartDTO, Long itemId, String email);

	void deleteCartItem(Long itemID);

	void deleteUserCartItems(UserEntity user);

	void addCartItemQty(Long itemID);

	void subCartItemQty(Long itemID);

	void clearCart(Long id);

}
