package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthenticationRequest;
import com.app.dto.AuthenticationResponse;
import com.app.dto.PasswordResetDTO;
import com.app.dto.UserDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.pojos.UserEntity;
import com.app.service.IProductService;
import com.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@CrossOrigin
public class SignInSignUpController {

	// dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;

	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;

//	 dep : user service for handling users
	@Autowired
	private IUserService userService;

	@Autowired
	private IProductService productService;

	// add a method to authenticate user . Incase of success --send back token , o.w
	// send back err mesg
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthenticationRequest request) {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> imple by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			// => auth succcess
			String token = utils.generateJwtToken(authenticatedDetails);
			return ResponseEntity.ok(new AuthenticationResponse("Authentication successful!", token,
					userService.findByEmail(utils.getUserNameFromJwtToken(token))));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}

	// add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserDTO user) {
		System.out.println("in reg user : user " + user + " roles " + user.getRole());//
		// invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
	}

	@GetMapping("/name")
	public String findByEmail(@RequestHeader("Authorization") String token) {
		UserEntity user = userService.findByEmail(utils.getUserNameFromJwtToken(token.substring(7)));
		return user.getFirstName() + " " + user.getLastName();
	}

	@PostMapping("/forgot")
	public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetDTO reset) {
		return ResponseEntity.ok(userService.sendPasswordResetLink(reset.getEmail()));
	}

	@PutMapping("/reset/{resetCode}")
	public ResponseEntity<String> passwordReset(@RequestBody PasswordResetDTO reset, @PathVariable String resetCode) {
		return ResponseEntity.ok(userService.passwordReset(reset, resetCode));
	}

	@GetMapping("/loadDb")
	public String loadDatabases() {
		System.out.println("in load db " + productService);
		return productService.loadDatabase();
	}

}
