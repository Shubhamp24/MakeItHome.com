package com.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CategoryWiseSales;
import com.app.dto.ProductDTO;
import com.app.pojos.Product;

public interface IProductService {

	void insertProduct(ProductDTO productDTO, MultipartFile imageFile);

	List<Product> getAllProducts();

	ProductDTO findById(Long id);

	void updateProduct(ProductDTO productDTO, MultipartFile imageFile);

	void updateProduct(ProductDTO productDTO, Long id);

	void deleteProduct(Long id);

	void insertProductImage(Long prodId, MultipartFile imageFile);

	List<Product> findByCategoryId(Long id);

	List<Product> getAllProductsSortByPriceHighToLow();

	List<Product> getAllProductsSortByPriceLowToHigh();

	List<CategoryWiseSales> getSales();

	String loadDatabase();
}
