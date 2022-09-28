package com.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.DuplicateEmailException;
import com.app.custom_exceptions.EmailNotFoundException;
import com.app.custom_exceptions.PasswordMismatchException;
import com.app.dto.AddressDTO;
import com.app.dto.PasswordResetDTO;
import com.app.dto.UpdateProfileDTO;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.pojos.Address;
import com.app.pojos.UserEntity;
import com.app.repository.AddressRepository;
import com.app.repository.UserRepository;
import com.app.service.email.IEmailSenderService;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addressRepo;

	// mapper
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private IEmailSenderService emailService;

	@Value("${hostname}")
	private String hostname;

	@Override
	public UserRegResponse registerUser(UserDTO user) {
		// Objective : 1 rec inserted in users table
		if (!user.getPassword().equals(user.getConfirmPassword())) {
			throw new PasswordMismatchException("Password Do Not Match");
		}

		try {
			userRepo.findByEmail(user.getEmail()).get();
			throw new DuplicateEmailException("Email is Already Registered!!!");
		} catch (NoSuchElementException e) {
			UserEntity userEntity = mapper.map(user, UserEntity.class);
			userEntity.setPassword(encoder.encode(userEntity.getPassword()));
			UserEntity persistentUser = userRepo.save(userEntity);
			Map<String, Object> model = new HashMap<>();
			model.put("name", user.getFirstName() + " " + user.getLastName());
			try {
				emailService.sendMail(user.getEmail(), "Welcome To MakeItHome.com", "register", model);
			} catch (MessagingException err) {
				System.out.println("Error Occured While Sending Email!!!");
			}
			return new UserRegResponse(persistentUser);
		}

	}

	@Override
	public List<UserEntity> getAllUsers() {
		List<UserEntity> users = userRepo.findAllUsers();
		users.size();
		return userRepo.findAllUsers();
	}

	@Override
	public AddressDTO setUserAddress(AddressDTO addressDTO, String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid User"));
		Address address = mapper.map(addressDTO, Address.class);
		if (user.getAddress() != null)
			address.setId(user.getAddress().getId());
		Address newAddress = addressRepo.save(address);
		user.setAddress(newAddress);
		return mapper.map(newAddress, AddressDTO.class);
	}

	@Override
	public UserEntity updateUserProfile(UpdateProfileDTO updateUser) {
		UserEntity user = userRepo.findByEmail(updateUser.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid Email"));
		user.setFirstName(updateUser.getFirstName());
		user.setLastName(updateUser.getLastName());
		user.setPhoneNumber(updateUser.getPhoneNumber());
		return user;
	}

	@Override
	public UserEntity findByEmail(String email) {
		return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid Email ID"));
	}

	@Override
	public String sendPasswordResetLink(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new EmailNotFoundException("Email not found."));
		user.setPasswordResetCode(UUID.randomUUID().toString());
		userRepo.save(user);
		Map<String, Object> model = new HashMap<>();
		model.put("resetUrl", "http://" + hostname + "/resetpassword/" + user.getPasswordResetCode());
		model.put("firstName", user.getFirstName());
		try {
			emailService.sendMail(email, "Password Reset", "password-reset-template", model);
		} catch (MessagingException e) {
			return "Error while sending email";
		}
		return "Reset password code is send to your E-mail";
	}

	@Override
	public String passwordReset(PasswordResetDTO reset, String resetCode) {
		UserEntity user = userRepo.findByPasswordResetCode(resetCode)
				.orElseThrow(() -> new RuntimeException("Error Occured While Updating Password"));
		user.setPasswordResetCode(null);
		user.setPassword(encoder.encode(reset.getPassword()));
		userRepo.save(user);
		return "Your password has been reset successfully!!!";
	}

	@Override
	public String sendOTPToMail(String email) {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(() -> new EmailNotFoundException("Email not found."));
		Random rnd = new Random();
		int otp = rnd.nextInt(999999);
		user.setOtp(otp);
		Map<String, Object> model = new HashMap<>();
		model.put("firstName", user.getFirstName());
		model.put("otp", otp);
		try {
			emailService.sendMail(email, "Change Password", "password-change-template", model);
		} catch (MessagingException e) {
			return "Error while sending email";
		}
		return "OTP is send to your E-mail for verification";
	}

	@Override
	public String updatePassword(PasswordResetDTO updatePassword) {
		UserEntity user = userRepo.findByOtp(updatePassword.getOtp());
		if (user == null) {
			throw new RuntimeException("Invalid OTP");
		}
		user.setPassword(encoder.encode(updatePassword.getPassword()));
		user.setOtp(null);
		return "Password Changed Successfully!!!";
	}

}
