package com.suraj.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.suraj.ecommerce.model.UserDetails;

//repository for user details
@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer>{
	
	Optional<UserDetails> findOneByEmailAndPassword(String email, String password);
	UserDetails findByEmail(String email);

}
