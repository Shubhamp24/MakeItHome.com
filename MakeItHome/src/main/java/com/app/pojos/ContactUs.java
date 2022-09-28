package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "contactus")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ContactUs extends BaseEntity {

	@Column(name = "post_date")
	private LocalDate postDate;

	private String name;

	@Email
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(length = 500)
	private String message;

	public ContactUs(String name, @Email String email, String phoneNumber, String message) {
		super();
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.message = message;
		this.postDate = LocalDate.now();
	}

}
