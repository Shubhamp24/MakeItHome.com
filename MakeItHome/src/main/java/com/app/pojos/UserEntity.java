package com.app.pojos;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity extends BaseEntity {

	@Column(length = 30, name = "first_name")
	private String firstName;
	@Column(length = 30, name = "last_name")
	private String lastName;
	@Column(length = 50, unique = true)
	private String email;
	@Column(length = 350)
	@JsonIgnore
	private String password;
	@Transient
	@JsonIgnore
	private String confirmPassword;
	@Column(name = "phone_number")
	private String phoneNumber;
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;
	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private Role role;
	@JsonIgnore
	@Column(name = "password_reset_code")
    private String passwordResetCode;
	@JsonIgnore
	@Column(name = "otp")
    private Integer otp;
	

	public UserEntity(String firstName, String lastName, String email, String password, String confirmPassword, Role role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber="
				+ phoneNumber + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(email);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserEntity other = (UserEntity) obj;
		return Objects.equals(email, other.email);
	}

}
