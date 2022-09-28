package com.app.custom_exceptions;

@SuppressWarnings("serial")
public class DuplicateEmailException extends RuntimeException{

	public DuplicateEmailException(String message) {
		super(message);
	}

}
