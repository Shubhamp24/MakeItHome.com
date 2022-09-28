package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.ContactUs;
import com.app.service.IContactUsService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/contactus")
public class ContactUsController {

	@Autowired
	private IContactUsService contactUsService;

	@PostMapping
	public String addCustomerQuery(@RequestBody ContactUs query) {
		return contactUsService.addQuery(query);
	}
}
