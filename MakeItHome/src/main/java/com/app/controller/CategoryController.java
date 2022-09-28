package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.ICategoryService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/categories")
public class CategoryController {
	@Autowired
	private ICategoryService categoryService;

	@GetMapping
	public ResponseEntity<?> getAllCategories() {
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.findById(id));
	}

}
