package com.app.service;

import java.util.List;

import com.app.dto.AddressDTO;
import com.app.dto.PasswordResetDTO;
import com.app.dto.UpdateProfileDTO;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.pojos.UserEntity;

public interface IUserService {

	UserRegResponse registerUser(UserDTO user);

	List<UserEntity> getAllUsers();

	AddressDTO setUserAddress(AddressDTO address, String email);

	UserEntity updateUserProfile(UpdateProfileDTO updateUser);

	UserEntity findByEmail(String userNameFromJwtToken);
	
	String sendPasswordResetLink(String email);
	
	String passwordReset(PasswordResetDTO reset, String resetCode);

	String sendOTPToMail(String email);

	String updatePassword(PasswordResetDTO updatePassword);

}
