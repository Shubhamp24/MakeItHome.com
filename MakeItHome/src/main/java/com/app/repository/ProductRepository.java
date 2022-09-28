package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Category;
import com.app.pojos.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByCategoryId(Category catId);

	void deleteAllByCategoryId(Category category);

	@Query("SELECT p FROM Product p WHERE p.categoryId!=null ORDER BY PRICE DESC")
	List<Product> findAllOrderByPriceDesc();

	@Query("SELECT p FROM Product p WHERE p.categoryId!=null ORDER BY PRICE")
	List<Product> findAllOrderByPriceAsc();

	List<Product> findAllByCategoryId(Category category);
	
	@Query("SELECT p FROM Product p WHERE p.categoryId!=null")
	List<Product> findAllProducts();

}
