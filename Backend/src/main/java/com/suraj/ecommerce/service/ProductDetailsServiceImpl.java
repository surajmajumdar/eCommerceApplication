package com.suraj.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suraj.ecommerce.model.ProductDetails;
import com.suraj.ecommerce.repository.ProductDetailsRepository;

@Service
public class ProductDetailsServiceImpl implements ProductDetailsService{
	
	@Autowired
	private ProductDetailsRepository productDetailsRepository;

	//method to save product details
	@Override
	public ProductDetails saveProductDetails(ProductDetails productDetails) {
		return productDetailsRepository.save(productDetails);
	}

	//method to get all the product details
	@Override
	public List<ProductDetails> getAllProducts() {
		return productDetailsRepository.findAll();
	}
	
	//method to get a particular product 
	@Override
	public ProductDetails getProductById(int productId) {
		return productDetailsRepository.findById(productId).orElse(null);
	}
	
	//method to delete a product from the database
	@Override
	public String deleteProductById(int productId) {
		productDetailsRepository.deleteById(productId);
		return "Product with ID: " + productId + " Deleted!!";
	}
	
	//method to update details of a product
	@Override
	public ProductDetails updateProduct(ProductDetails productDetails) {
		ProductDetails existingProduct=productDetailsRepository.findById(productDetails.getProductId()).orElse(null);
		existingProduct.setProductTitle(productDetails.getProductTitle());
		existingProduct.setCategory(productDetails.getCategory());
		existingProduct.setImageURL(productDetails.getImageURL());
		existingProduct.setPrice(productDetails.getPrice());
		existingProduct.setRating(productDetails.getRating());
		return productDetailsRepository.save(existingProduct);

	}

}
