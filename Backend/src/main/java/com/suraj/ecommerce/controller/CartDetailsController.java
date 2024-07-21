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

import com.suraj.ecommerce.model.CartDetails;
import com.suraj.ecommerce.service.CartDetailsService;

@RestController
@RequestMapping("/cartDetails")
@CrossOrigin
public class CartDetailsController {
	
	@Autowired
	private CartDetailsService cartDetailsService;
	
	//post request to add to cart
	@PostMapping("/addToCart")
	public String add(@RequestBody CartDetails cartDetails) {
		cartDetailsService.addToCart(cartDetails);
		return "New item is added";
	}
	
	//get request to get all cart details for a particular user
	@GetMapping("/getAllCartItems/{userId}")
	public List<CartDetails> getCart(@PathVariable int userId){
		return cartDetailsService.getCart(userId);
	}
	
	//get request to get a particular cart item
	@GetMapping("/getCartItem/{cartItemId}")
	public CartDetails getCartItem (@PathVariable int cartItemId) {
		return cartDetailsService.getCartItem(cartItemId);
	}
	
	//put request to update the quantity
	@PutMapping("/updateQuantity")
	public CartDetails updateQuantity(@RequestBody CartDetails cartDetails) {
		return cartDetailsService.updateQuantity(cartDetails);
	}
	
	//delete request to delete an item from the cart
	@DeleteMapping("/deleteFromCart/{cartItemid}")
	public String deleteFromCart(@PathVariable int cartItemid) {
		return cartDetailsService.deleteFromCart(cartItemid);
	}
	
	//delete request to delete all the cart items for a particular user
	@DeleteMapping("/deleteAllItems/{userId}")
	public String deleteAllItems(@PathVariable int userId) {
		return cartDetailsService.deleteAllItems(userId);
	}
	
	//get request to get product details from the cart details for a particular user
	@GetMapping("/getCartDetailsWithProduct/{userId}")
    public List<Object[]> getCartDetailsWithProduct(@PathVariable int userId) {
        return cartDetailsService.getCartDetailsWithProduct(userId);
    }

}
