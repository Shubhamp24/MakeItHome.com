package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.InvalidIdException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.data.utils.DataUtils;
import com.app.dto.CategoryWiseSales;
import com.app.dto.ProductDTO;
import com.app.pojos.Category;
import com.app.pojos.OrderItem;
import com.app.pojos.Product;
import com.app.repository.CategoryRepository;
import com.app.repository.OrderItemRepository;
import com.app.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class ProductServiceImpl implements IProductService {

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private CategoryRepository categoryRepo;

	@Autowired
	private ICategoryService categoryService;

	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private OrderItemRepository orderItemRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public void insertProduct(ProductDTO productDTO, MultipartFile imageFile) {
		log.info("in prod add service");
		Category category = categoryRepo.findById(productDTO.getCategoryId())
				.orElseThrow(() -> new InvalidIdException("Invalid Category Id!!!"));
		Product product = new Product();
		product.setProductName(productDTO.getProductName());
		product.setProductDescription(productDTO.getProductDescription());
		product.setCategoryId(category);
		product.setPrice(productDTO.getPrice());
		product.setStock(productDTO.getStock());
		try {
			product.setImagePath(imageService.storeImage(imageFile));
		} catch (IOException e) {
			throw new ResourceNotFoundException("Error Occured While Storing Image");
		}
		productRepo.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepo.findAllProducts();
	}

	@Override
	public ProductDTO findById(Long id) {
		return mapper.map(productRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid ID!!!")),
				ProductDTO.class);
	}

	@Override
	public void updateProduct(ProductDTO productDTO, MultipartFile imageFile) {
		Product product = productRepo.findById(productDTO.getId())
				.orElseThrow(() -> new InvalidIdException("Invalid Product Id!!!"));
		product.setPrice(productDTO.getPrice());
		product.setProductDescription(productDTO.getProductDescription());
		product.setProductName(productDTO.getProductName());
		product.setStock(productDTO.getStock());
		try {
			product.setImagePath(imageService.storeImage(imageFile));
		} catch (IOException e) {
			throw new ResourceNotFoundException("Error Occured While Storing Image");
		}
	}

	@Override
	public void updateProduct(ProductDTO productDTO, Long id) {
		Product product = productRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Product Id!!!"));
		product.setPrice(productDTO.getPrice());
		product.setProductDescription(productDTO.getProductDescription());
		product.setProductName(productDTO.getProductName());
		product.setStock(productDTO.getStock());
	}

	@Override
	public void deleteProduct(Long id) {
		log.info("in delete product method");
		productRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Id!!!"));
		productRepo.deleteById(id);
	}

	@Override
	public void insertProductImage(Long prodId, MultipartFile imageFile) {
		Product product = productRepo.findById(prodId).orElseThrow(() -> new InvalidIdException("Invalid Product ID"));

		try {
			product.setImagePath(imageService.storeImage(imageFile));
		} catch (IOException e) {
			throw new ResourceNotFoundException("Error Occured While Storing Image");
		}

	}

	@Override
	public List<Product> findByCategoryId(Long id) {
		Category category = categoryRepo.findById(id).orElseThrow(() -> new InvalidIdException("Invalid Category ID"));
		return productRepo.findByCategoryId(category);
	}

	@Override
	public List<Product> getAllProductsSortByPriceHighToLow() {
		return productRepo.findAllOrderByPriceDesc();
	}

	@Override
	public List<Product> getAllProductsSortByPriceLowToHigh() {
		return productRepo.findAllOrderByPriceAsc();
	}

	@Override
	public List<CategoryWiseSales> getSales() {
		List<OrderItem> orderItems = orderItemRepo.findAll();
		Map<String, Long> sales = new HashMap<>();
		if (orderItems.size() != 0) {
			for (OrderItem orderItem : orderItems) {
				if (sales.containsKey(orderItem.getProduct().getCategoryId().getCategoryName())) {
					sales.put(orderItem.getProduct().getCategoryId().getCategoryName(),
							sales.get(orderItem.getProduct().getCategoryId().getCategoryName())
									+ orderItem.getQuantity());
				} else {
					sales.put(orderItem.getProduct().getCategoryId().getCategoryName(), orderItem.getQuantity());
				}

			}
		}

		List<CategoryWiseSales> catSales = new ArrayList<>();
		for (Entry<String, Long> entry : sales.entrySet())
			catSales.add(new CategoryWiseSales(entry.getKey(), entry.getValue()));
		return catSales;
	}

	@Override
	public String loadDatabase() {
		DataUtils utils = new DataUtils();
		System.out.println("0000000000000");
		try {
			List<Product> listOfProducts = utils.getListsOfProducts(mapper, categoryService);
			System.out.println(listOfProducts + " 111111111111111");
			for (Product product : listOfProducts) {
				productRepo.save(product);
			}
			return "Congratulations All Products has been  SAVED Successfully";
		} catch (Exception e) {
			return "OOOOPPPPSSS !!! Sorry , Your Products Details Can't Save, Please Check and Save again, Thanks !! ";
		}
	}

}
