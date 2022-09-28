package com.app.custom_exceptions;

@SuppressWarnings("serial")
public class EmailNotFoundException extends RuntimeException {

	public EmailNotFoundException(String message) {
		super(message);
	}


}
