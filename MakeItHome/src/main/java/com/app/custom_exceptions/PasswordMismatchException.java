package com.app.custom_exceptions;

@SuppressWarnings("serial")
public class PasswordMismatchException extends RuntimeException {

	public PasswordMismatchException(String message) {
		super(message);
	}

}
