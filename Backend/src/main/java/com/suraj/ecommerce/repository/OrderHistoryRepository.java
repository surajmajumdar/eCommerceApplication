package com.suraj.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.suraj.ecommerce.model.OrderHistory;

//repository for order history
@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Integer>{

	List<OrderHistory> findOrderHistoryByUserId(int userId);

}
