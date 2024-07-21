package com.suraj.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.suraj.ecommerce.model.ProductDetails;

//repository for product details
@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Integer>{

}
