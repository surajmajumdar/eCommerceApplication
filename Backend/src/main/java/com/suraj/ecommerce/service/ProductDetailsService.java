package com.suraj.ecommerce.service;

import java.util.List;

import com.suraj.ecommerce.model.ProductDetails;

//interface of product details service
public interface ProductDetailsService {
	public ProductDetails saveProductDetails(ProductDetails productDetails);
	public List<ProductDetails> getAllProducts();
	public ProductDetails getProductById(int id);
	String deleteProductById(int productId);
	ProductDetails updateProduct(ProductDetails productDetails);

}