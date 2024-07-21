package com.suraj.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suraj.ecommerce.model.OrderHistory;
import com.suraj.ecommerce.service.OrderHistoryService;

@RestController
@RequestMapping("/orderHistory")
@CrossOrigin
public class OrderHistoryController {
	
	@Autowired
	private OrderHistoryService orderHistoryService;
	
	//post request to save order history
	@PostMapping("/saveOrderHistory")
	public String add(@RequestBody OrderHistory orderHistory) {
		orderHistoryService.saveOrderHistory(orderHistory);
		return "New order is added";
	}
	
	//get request to get all order history for a particular user
	@GetMapping("/getAllOrders/{userId}")
	public List<OrderHistory> getCart(@PathVariable int userId){
		return orderHistoryService.getOrderHistory(userId);
	}
	

}
