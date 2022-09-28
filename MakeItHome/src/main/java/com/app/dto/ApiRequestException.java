package com.app.dto;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@SuppressWarnings("serial")
@Getter
public class ApiRequestException extends RuntimeException {
	private final HttpStatus status;

	public ApiRequestException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}
}
