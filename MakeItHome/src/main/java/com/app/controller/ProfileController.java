package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddressDTO;
import com.app.dto.PasswordResetDTO;
import com.app.dto.UpdateProfileDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IUserService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/profile")
public class ProfileController {

	@Autowired
	private IUserService userService;

	@Autowired
	private JwtUtils utils;

	@PostMapping("/setaddress")
	public ResponseEntity<?> setUserAddress(@RequestBody @Valid AddressDTO address,
			@RequestHeader("Authorization") String token) {
		return new ResponseEntity<>(
				userService.setUserAddress(address, utils.getUserNameFromJwtToken(token.substring(7))),
				HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateUserProfile(@RequestBody UpdateProfileDTO updateUser) {
		return ResponseEntity.ok(userService.updateUserProfile(updateUser));
	}

	@PostMapping("/sendotp")
	public ResponseEntity<String> OTPForPassword(@RequestBody PasswordResetDTO dto) {
		return ResponseEntity.ok(userService.sendOTPToMail(dto.getEmail()));
	}

	@PutMapping("/updatepassword")
	public ResponseEntity<String> updatePassword(@RequestBody PasswordResetDTO updatePassword) {
		return ResponseEntity.ok(userService.updatePassword(updatePassword));
	}

}
