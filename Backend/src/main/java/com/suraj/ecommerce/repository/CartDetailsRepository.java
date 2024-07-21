package com.suraj.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.suraj.ecommerce.model.CartDetails;

//repository for cart details
@Repository
public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer>{

	List<CartDetails> findCartDetailsByUserId(int userId);
	void deleteByUserId(int userId);
	@Query("SELECT cd, p FROM CartDetails cd JOIN ProductDetails p ON cd.productId = p.productId WHERE cd.userId = :userId")
    List<Object[]> findCartDetailsWithProductByUserId(int userId);
	CartDetails findByCartItemId(int cartItemId);

}
