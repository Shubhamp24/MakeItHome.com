package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	@Query("select u from UserEntity u where u.email=?1")
	Optional<UserEntity> findByEmail(String email);

	@Query("select u from UserEntity u where u.role='CUSTOMER'")
	List<UserEntity> findAllUsers();

	Optional<UserEntity> findByPasswordResetCode(String resetCode);

	UserEntity findByOtp(Integer otp);
	
}
