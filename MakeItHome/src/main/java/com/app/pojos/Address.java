package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "addresses")
@Getter
@Setter
public class Address extends BaseEntity {

	@Column(name = "house_no")
	private String houseNo;

	@Column(length = 60)
	private String street;

	@Column(length = 30)
	private String city;

	@Column(length = 30)
	private String state;

	@Column(length = 30)
	private String country;

	@Column(name = "zipcode")
	private String zipCode;

	public Address() {

	}

	public Address(String houseNo, String street, String city, String state, String country, String zipCode) {
		super();
		this.houseNo = houseNo;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
	}

	@Override
	public String toString() {
		return houseNo + ", " + street + ", " + city + ", " + state
				+ ", " + country + ". Pincode :" + zipCode+".";
	}

}
