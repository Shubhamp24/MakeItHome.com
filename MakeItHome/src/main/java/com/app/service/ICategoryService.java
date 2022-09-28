package com.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CategoryDTO;
import com.app.pojos.Category;

public interface ICategoryService {
	void insertCategory(CategoryDTO categoryDTO ,MultipartFile imageFile );

	List<Category> getAllCategories();

	CategoryDTO findById(Long id);
	
	void updateCategory(CategoryDTO categoryDTO ,MultipartFile imageFile );

	void updateCategory(CategoryDTO categoryDTO, Long id);

	void deleteCategory(Long id);

	Category findByCategoryName(String categoryName);


}
