package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.ContactUs;
import com.app.repository.ContactUsRepository;

@Service
@Transactional
public class ContactUsServiceImpl implements IContactUsService {

	@Autowired
	private ContactUsRepository contactUsRepo;

	@Override
	public String addQuery(ContactUs query) {
		contactUsRepo.save(query);
		return "Thank You For Contacting Us!!!";
	}

}
