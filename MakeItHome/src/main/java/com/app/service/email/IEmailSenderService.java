package com.app.service.email;

import java.util.Map;

import javax.mail.MessagingException;

public interface IEmailSenderService {

	void sendMail(String to, String subject, String template, Map<String, Object> attributes) throws MessagingException;

}
