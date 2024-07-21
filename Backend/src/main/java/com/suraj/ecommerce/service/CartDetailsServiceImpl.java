package com.suraj.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suraj.ecommerce.model.CartDetails;
import com.suraj.ecommerce.repository.CartDetailsRepository;

import jakarta.transaction.Transactional;

@Service
public class CartDetailsServiceImpl implements CartDetailsService{
	
	@Autowired
	private CartDetailsRepository cartDetailsRepository;

	//method to save cart item
	@Override
	public CartDetails addToCart(CartDetails cartItem) {
		return cartDetailsRepository.save(cartItem);
	}

	//method to get all cart items for a particular user
	@Override
	public List<CartDetails> getCart(int userId) {
		return cartDetailsRepository.findCartDetailsByUserId(userId);
	}

	//method to delete an item from the cart
	@Override
	public String deleteFromCart(int cartItemId) {
		cartDetailsRepository.deleteById(cartItemId);
		return "CartItem with ID: " + cartItemId + " Deleted!!";
	}
	
	//method to empty the cart for a particular user
	@Transactional
	@Override
	public String deleteAllItems(int userId) {
		cartDetailsRepository.deleteByUserId(userId);
		return "Cart emptied for user ID: " + userId;
	}
	
	//method to get product details as well as cart details
	@Override
	public List<Object[]> getCartDetailsWithProduct(int userId) {
        return cartDetailsRepository.findCartDetailsWithProductByUserId(userId);
    }

	//method to update the quantity in the cart
	@Override
	public CartDetails updateQuantity(CartDetails cartItem) {
		CartDetails existingCartItem=cartDetailsRepository.findById(cartItem.getCartItemId()).orElse(null);
		existingCartItem.setQuantity(cartItem.getQuantity());
		return cartDetailsRepository.save(existingCartItem);
	}

	//method to get a particular cart item
	@Override
	public CartDetails getCartItem(int cartItemId) {
		return cartDetailsRepository.findByCartItemId(cartItemId);
	}

}
