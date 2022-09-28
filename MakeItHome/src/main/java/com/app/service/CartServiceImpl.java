package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.InvalidIdException;
import com.app.dto.AddToCartDTO;
import com.app.dto.CartDTO;
import com.app.dto.CartItemDTO;
import com.app.pojos.Cart;
import com.app.pojos.Product;
import com.app.pojos.UserEntity;
import com.app.repository.CartRepository;
import com.app.repository.ProductRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Cart addToCart(AddToCartDTO addToCartDTO, String email) {
		Product product = productRepo.findById(addToCartDTO.getProductId())
				.orElseThrow(() -> new InvalidIdException("Invalid Product Id"));
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid Email"));
		Cart cartItem = cartRepo.findByUserAndProduct(user, product);
		if (cartItem != null) {
			cartItem.setCreatedDate(LocalDate.now());
			cartItem.setQuantity(addToCartDTO.getQuantity());
			return cartItem;
		}
		Cart addToCart = new Cart(product, user, addToCartDTO.getQuantity());
		return cartRepo.save(addToCart);
	}

	@Override
	public CartDTO listCartItems(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid Email"));
		List<Cart> cartList = cartRepo.findAllByUserOrderByCreatedDateDesc(user);
		List<CartItemDTO> cartItems = new ArrayList<>();
		double totalCost = 0;
		for (Cart cart : cartList) {
			totalCost += cart.getProduct().getPrice() * cart.getQuantity();
			CartItemDTO cartItemDTO = getDTOFromCart(cart);
			cartItems.add(cartItemDTO);
		}
		return new CartDTO(cartItems, totalCost);
	}

	public static CartItemDTO getDTOFromCart(Cart cart) {
		return new CartItemDTO(cart);
	}

	@Override
	public void updateCartItem(AddToCartDTO cartDTO, Long itemId, String email) {
        userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid Email"));
		Cart cart = cartRepo.findById(itemId).orElseThrow(() -> new InvalidIdException("Invalid Cart Id"));
		cart.setQuantity(cartDTO.getQuantity());
		cart.setCreatedDate(LocalDate.now());
		cartRepo.save(cart);
	}

	@Override
	public void deleteCartItem(Long itemID) {
		if (!cartRepo.existsById(itemID))
			throw new InvalidIdException("Invalid CartItemId");
		cartRepo.deleteById(itemID);

	}

	@Override
	public void deleteUserCartItems(UserEntity user) {
		cartRepo.deleteByUser(user);
	}

	@Override
	public void addCartItemQty(Long itemID) {
		Cart cart = cartRepo.findById(itemID).orElseThrow(() -> new InvalidIdException("Invalid Item ID"));
		if (cart.getQuantity() != cart.getProduct().getStock()) {
			cart.setQuantity(cart.getQuantity() + 1);
		} else {
			throw new RuntimeException("You have reached available qty limit");
		}

	}

	@Override
	public void subCartItemQty(Long itemID) {
		Cart cart = cartRepo.findById(itemID).orElseThrow(() -> new InvalidIdException("Invalid Item ID"));
		if (cart.getQuantity() > 1) {
			cart.setQuantity(cart.getQuantity() - 1);
		} else {
			cartRepo.deleteById(itemID);
		}

	}

	@Override
	public void clearCart(Long id) {
		UserEntity user = userRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid User!!!"));
		List<Cart> cartItemList = cartRepo.findAllByUser(user);
		if (cartItemList.size() == 0)
			throw new RuntimeException("Cart is Already Empty");
		cartRepo.deleteByUser(user);
	}

}
