package com.suraj.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suraj.ecommerce.model.OrderHistory;
import com.suraj.ecommerce.repository.OrderHistoryRepository;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService{
	
	@Autowired
	private OrderHistoryRepository orderHistoryRepository;

	//method to save the order history in the database
	@Override
	public OrderHistory saveOrderHistory(OrderHistory orderHistory) {
		return orderHistoryRepository.save(orderHistory);
	}
	
	//method to get all the order history for a particular user
	@Override
	public List<OrderHistory> getOrderHistory(int userId) {
		return orderHistoryRepository.findOrderHistoryByUserId(userId);
	}


}
