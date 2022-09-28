package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.jwt_utils.JwtUtils;
import com.app.pojos.Product;
import com.app.pojos.WishList;
import com.app.service.IWishListService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/wishlist")
public class WishListController {

	@Autowired
	private IWishListService wishListService;
	
	@Autowired
	private JwtUtils utils;

	@GetMapping
	public ResponseEntity<?> getWishList(@RequestHeader("Authorization") String token) {
		List<WishList> wishLists = wishListService.getWishList(utils.getUserNameFromJwtToken(token.substring(7)));
		return ResponseEntity.ok(wishLists);
	}

	@PostMapping("/add")
	public ResponseEntity<?> addWishList(@RequestBody Product product, @RequestHeader("Authorization") String token) {
		wishListService.createWishlist(product, utils.getUserNameFromJwtToken(token.substring(7)));
		return ResponseEntity.status(HttpStatus.CREATED).body("Added to wishlist");
	}
	
	@DeleteMapping
	public ResponseEntity<?> clearWishList(@RequestHeader("Authorization") String token) {
		wishListService.clearWishList(utils.getUserNameFromJwtToken(token.substring(7)));
		return ResponseEntity.status(HttpStatus.OK).body("Wishlist is Empty Now");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFromWishList(@PathVariable Long id) {
		wishListService.deleteFromWishlist(id);
		return ResponseEntity.status(HttpStatus.OK).body("Removed From wishlist");
	}

}
