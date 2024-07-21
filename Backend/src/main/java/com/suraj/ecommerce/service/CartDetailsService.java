package com.suraj.ecommerce.service;

import java.util.List;

import com.suraj.ecommerce.model.CartDetails;

//interface of cart details service
public interface CartDetailsService {
	public CartDetails addToCart(CartDetails cartItem);
	public List<CartDetails> getCart(int userId);
	String deleteFromCart(int cartItemId);
	String deleteAllItems(int userId);
	CartDetails updateQuantity(CartDetails cartItem);
	List<Object[]> getCartDetailsWithProduct(int userId);
	public CartDetails getCartItem(int cartItemId);

}