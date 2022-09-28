package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.IProductService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/products")
public class ProductController {

	@Autowired
	private IProductService productService;

	@GetMapping
	public ResponseEntity<?> getAllProducts() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(productService.findById(id));
	}

	@GetMapping("/category/{catId}")
	public ResponseEntity<?> findByCategoryId(@PathVariable("catId") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(productService.findByCategoryId(id));
	}

	@GetMapping("/sortbyprice/hightolow")
	public ResponseEntity<?> getAllProductsSortByPriceHighToLow() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductsSortByPriceHighToLow());
	}

	@GetMapping("/sortbyprice/lowtohigh")
	public ResponseEntity<?> getAllProductsSortByPriceLowToHigh() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductsSortByPriceLowToHigh());
	}
}
