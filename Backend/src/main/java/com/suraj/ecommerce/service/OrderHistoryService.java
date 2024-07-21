package com.suraj.ecommerce.service;

import java.util.List;

import com.suraj.ecommerce.model.OrderHistory;

//interface of order history service
public interface OrderHistoryService {

	OrderHistory saveOrderHistory(OrderHistory orderHistory);

	List<OrderHistory> getOrderHistory(int userId);

}