package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddToCartDTO;
import com.app.dto.CartDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.ICartService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/carts")
public class CartController {
	@Autowired
	private ICartService cartService;

	@Autowired
	private JwtUtils utils;

	@PostMapping("/addtocart")
	public ResponseEntity<?> addToCart(@RequestBody @Valid AddToCartDTO addToCartDTO,
			@RequestHeader("Authorization") String token) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(cartService.addToCart(addToCartDTO, utils.getUserNameFromJwtToken(token.substring(7))));
	}

	@GetMapping
	public ResponseEntity<CartDTO> getCartItems(@RequestHeader("Authorization") String token) {
		CartDTO cartDTO = cartService.listCartItems(utils.getUserNameFromJwtToken(token.substring(7)));
		return ResponseEntity.ok(cartDTO);
	}

	@PutMapping("/update/{cartItemId}")
	public ResponseEntity<?> updateCartItem(@RequestBody @Valid AddToCartDTO cartDto,
			@RequestHeader("Authorization") String token, @PathVariable("cartItemId") Long itemID) {
		cartService.updateCartItem(cartDto, itemID, utils.getUserNameFromJwtToken(token.substring(7)));
		return ResponseEntity.ok("Item has been updated");
	}

	@DeleteMapping("/delete/{cartItemId}")
	public ResponseEntity<?> deleteCartItem(@PathVariable("cartItemId") Long itemID) {
		cartService.deleteCartItem(itemID);
		return ResponseEntity.ok("Item has been removed");
	}
	
	@PutMapping("/addqty/{cartItemId}")
	public String addCartItemQty(@PathVariable("cartItemId") Long itemID){
		cartService.addCartItemQty(itemID);
		return "Qty Updated";
	}
	
	@PutMapping("/subqty/{cartItemId}")
	public String subCartItemQty(@PathVariable("cartItemId") Long itemID){
		cartService.subCartItemQty(itemID);
		return "Qty Updated";
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> clearUserCart(@PathVariable Long id) {
		cartService.clearCart(id);
		return ResponseEntity.ok("Cart is Empty Now!!!");
	}
	
}
