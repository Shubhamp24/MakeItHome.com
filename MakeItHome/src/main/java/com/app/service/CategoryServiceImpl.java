package com.app.service;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.InvalidIdException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CategoryDTO;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.repository.CategoryRepository;
import com.app.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private CategoryRepository categoryRepo;

	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ProductRepository productRepo;

	@Override
	public void insertCategory(CategoryDTO categoryDTO, MultipartFile imageFile) {
		log.info("in cat add service");
		if (categoryRepo.findByCategoryName(categoryDTO.getCategoryName()) != null) {
			throw new RuntimeException("Category Type Already Available!!!");
		}
		Category category = mapper.map(categoryDTO, Category.class);

		try {
			log.info("in image saving block method");
			category.setImagePath(imageService.storeImage(imageFile));
		} catch (IOException e) {
			log.info("in image err block method");
			throw new ResourceNotFoundException("Error Occured While Storing Image");
		}
		categoryRepo.save(category);

	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> categories = categoryRepo.findAll();
		return categories;
	}

	@Override
	public CategoryDTO findById(Long id) {
		return mapper.map(categoryRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid ID!!!")),
				CategoryDTO.class);
	}

	@Override
	public Category findByCategoryName(String categoryName) {
		return categoryRepo.findByCategoryName(categoryName);
	}

	@Override
	public void updateCategory(CategoryDTO categoryDTO, MultipartFile imageFile) {
		Category category = categoryRepo.findById(categoryDTO.getId())
				.orElseThrow(() -> new InvalidIdException("Invalid Id!!!"));
		List<Category> categoryList = categoryRepo.findAll();
		for (Category cat : categoryList) {
			if (cat.getId() != category.getId() && cat.getCategoryName().equals(categoryDTO.getCategoryName())) {
				throw new RuntimeException("Category Type Already Available!!!");
			}
		}
		category.setCategoryName(categoryDTO.getCategoryName());
		try {
			log.info("in image saving block method");
			category.setImagePath(imageService.storeImage(imageFile));
		} catch (IOException e) {
			log.info("in image err block method");
			throw new ResourceNotFoundException("Error Occured While Storing Image");
		}
	}

	@Override
	public void updateCategory(CategoryDTO categoryDTO, Long id) {
		Category category = categoryRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Id!!!"));

		List<Category> categoryList = categoryRepo.findAll();
		for (Category cat : categoryList) {
			if (cat.getId() != category.getId() && cat.getCategoryName().equals(categoryDTO.getCategoryName())) {
				throw new RuntimeException("Category Type Already Available!!!");
			}
		}
		category.setCategoryName(categoryDTO.getCategoryName());
	}

	@Override
	public void deleteCategory(Long id) {
		Category category = categoryRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Id!!!"));
		List<Product> products = productRepo.findAllByCategoryId(category);
		for (Product product : products) {
			product.setCategoryId(null);
		}
		categoryRepo.deleteById(id);
	}

}
