package com.app.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CategoryDTO;
import com.app.dto.OrderResponseDTO;
import com.app.dto.ProductDTO;
import com.app.pojos.Order;
import com.app.service.ICategoryService;
import com.app.service.IOrderService;
import com.app.service.IProductService;
import com.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/admin")
@Slf4j
public class AdminController {

	@Autowired
	private ICategoryService categoryService;

	@Autowired
	private IProductService productService;

	@Autowired
	private IUserService userService;

	@Autowired
	private IOrderService orderService;

	@PostMapping(value = "/addcategory")
	public String addCategory(@RequestPart("category") CategoryDTO categoryDTO, @RequestPart MultipartFile imageFile) {
		log.info("in addCategory Method from Admin Controller");
		System.out.println(categoryDTO);
		categoryService.insertCategory(categoryDTO, imageFile);
		return "Category Successfully added!!!";
	}

	@PutMapping("/updatecategory")
	public String updateCategory(@RequestPart("category") CategoryDTO categoryDTO,
			@RequestPart MultipartFile imageFile) {
		log.info(categoryDTO.toString());
		categoryService.updateCategory(categoryDTO, imageFile);
		return "Category Updated SuccessFully";
	}

	@PutMapping("/updatecategory/{id}")
	public String updateCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable("id") Long id) {
		log.info(categoryDTO.toString());
		categoryService.updateCategory(categoryDTO, id);
		return "Category Updated SuccessFully";
	}

	@DeleteMapping("/deletecategory/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {// @Valid
		log.info(id.toString());
		categoryService.deleteCategory(id);
		return ResponseEntity.status(HttpStatus.OK).body("Category Successfully Deleted!!!");
	}

	@PostMapping(value = "/addproduct")
	public String addProduct(@RequestPart("product") ProductDTO productDTO, @RequestPart MultipartFile imageFile) {
		log.info("in addProduct Method from Admin Controller");
		log.info(productDTO.toString());
		System.out.println(productService + "   add product");
		productService.insertProduct(productDTO, imageFile);
		return "Product Successfully added!!!";
	}

	@PutMapping("/updateproduct")
	public String updateProduct(@RequestPart("product") ProductDTO productDTO, @RequestPart MultipartFile imageFile) {
		log.info(productDTO.toString());
		log.info("imagefile" + imageFile);
		productService.updateProduct(productDTO, imageFile);
		return "Product Updated SuccessFully";
	}

	@PutMapping("/updateproduct/{id}")
	public String updateProduct(@RequestBody ProductDTO productDTO, @PathVariable Long id) {
		log.info(productDTO.toString());
		productService.updateProduct(productDTO, id);
		return "Product Updated SuccessFully";
	}

	@DeleteMapping("/deleteproduct/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
		log.info(id.toString());
		productService.deleteProduct(id);
		return ResponseEntity.status(HttpStatus.OK).body("Product Successfully Deleted!!!");
	}

	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

	@GetMapping("/orders")
	public List<OrderResponseDTO> getAllOrders() {
		List<OrderResponseDTO> orderList = new ArrayList<>();
		List<Order> orders = orderService.listOrders();
		for (Order order : orders) {
			orderList.add(new OrderResponseDTO(order.getId(), order.getRazorPayOrderId(), order.getTotalPrice(),
					order.getOrderTime(), order.getOrderItems(), order.getStatus().name(), order.getUser().getId(),
					order.getUser().getEmail(), order.getShippingAddress()));
		}
		return orderList;
	}

	@GetMapping("/pendingorders")
	public List<OrderResponseDTO> getAllPendingOrders() {
		List<OrderResponseDTO> orderList = new ArrayList<>();
		List<Order> orders = orderService.listPendingOrders();
		for (Order order : orders) {
			orderList.add(new OrderResponseDTO(order.getId(), order.getRazorPayOrderId(), order.getTotalPrice(),
					order.getOrderTime(), order.getOrderItems(), order.getStatus().name(), order.getUser().getId(),
					order.getUser().getEmail(), order.getShippingAddress()));
		}
		return orderList;
	}

	@GetMapping("/shippedorders")
	public List<OrderResponseDTO> getAllShippedOrders() {
		List<OrderResponseDTO> orderList = new ArrayList<>();
		List<Order> orders = orderService.listShippedOrders();
		for (Order order : orders) {
			orderList.add(new OrderResponseDTO(order.getId(), order.getRazorPayOrderId(), order.getTotalPrice(),
					order.getOrderTime(), order.getOrderItems(), order.getStatus().name(), order.getUser().getId(),
					order.getUser().getEmail(), order.getShippingAddress()));
		}
		return orderList;
	}

	@GetMapping("/cancelledorders")
	public List<OrderResponseDTO> getAllCancelledOrders() {
		List<OrderResponseDTO> orderList = new ArrayList<>();
		List<Order> orders = orderService.listCancelledOrders();
		for (Order order : orders) {
			orderList.add(new OrderResponseDTO(order.getId(), order.getRazorPayOrderId(), order.getTotalPrice(),
					order.getOrderTime(), order.getOrderItems(), order.getStatus().name(), order.getUser().getId(),
					order.getUser().getEmail(), order.getShippingAddress()));
		}
		return orderList;
	}

	@PutMapping("/approveorder/{orderId}")
	public String approveOrder(@PathVariable("orderId") Long id) {
		orderService.approveOrder(id);
		return "Order has been approved";
	}

	@PutMapping("/cancelorder/{orderId}")
	public String cancelOrder(@PathVariable("orderId") Long id) {
		orderService.cancelOrder(id);
		return "Order has been cancelled";
	}

	@GetMapping("/getsales")
	public ResponseEntity<?> getCategoryWiseSales() {
		return ResponseEntity.ok(productService.getSales());
	}

}
