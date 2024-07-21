package com.suraj.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suraj.ecommerce.model.ProductDetails;
import com.suraj.ecommerce.service.ProductDetailsService;

@CrossOrigin
@RestController
@RequestMapping("/productDetails")
public class ProductDetailsController {
	@Autowired
	private ProductDetailsService productDetailsService;
	
	//post request to add a product
	@PostMapping("/addProduct")
	public String add(@RequestBody ProductDetails productDetails) {
		productDetailsService.saveProductDetails(productDetails);
		return "New product is added";
	}
	
	//get request to get all product details
	@GetMapping("/getAllProducts")
	public List<ProductDetails> getAllProducts(){
		return productDetailsService.getAllProducts();
	}
	
	//get request to get details of a particular product
	@GetMapping("/getProduct/{id}")
	public ProductDetails findProductById(@PathVariable int id) {
		return productDetailsService.getProductById(id);
	}
	
	//put request to update details of a product
	@PutMapping("/updateProduct")
	public ProductDetails updateProduct(@RequestBody ProductDetails productDetails) {
		return productDetailsService.updateProduct(productDetails);
	}
	
	//delete request to delete a product from the database
	@DeleteMapping("/deleteProduct/{id}")
	public String deleteProduct(@PathVariable int id) {
		return productDetailsService.deleteProductById(id);
	}

}
