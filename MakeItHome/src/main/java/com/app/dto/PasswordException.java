package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class PasswordException{

	private String mesg;

	public PasswordException(String message) {

		this.mesg = message;

	}

}
