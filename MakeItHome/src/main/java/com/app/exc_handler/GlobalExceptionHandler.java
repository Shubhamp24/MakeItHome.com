package com.app.exc_handler;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.custom_exceptions.DuplicateEmailException;
import com.app.custom_exceptions.EmailNotFoundException;
import com.app.custom_exceptions.InvalidIdException;
import com.app.custom_exceptions.PasswordMismatchException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ErrorResponse;

@ControllerAdvice // MANDATORY annotation to tell SC , following is the global exc handler class
					// to intercept exceptions in all controllers n rest controllers
//ResponseEntityExceptionHandler => a base class , for handling methdo arg not valid type of excs
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		// what is expected ret type ? RespEntity -- status : 400 , Body : map of field
		// name n err mesg
		System.out.println("in global handler : method arg invalid");
//		Map<String , String> errorMap=new HashMap<>();
//		for(FieldError e : ex.getFieldErrors())
//			errorMap.put(e.getField(), e.getDefaultMessage());
		Map<String, String> errorMap = ex.getFieldErrors().stream() // Stream<FieldError>
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
	}

	@ExceptionHandler(PasswordMismatchException.class)
	public ResponseEntity<?> passwordException(PasswordMismatchException e) {
		System.out.println("in run time pass exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));// check later
																										// password
																										// Exception
	}

	@ExceptionHandler(InvalidIdException.class)
	public ResponseEntity<?> invalidIdException(InvalidIdException e) {
		System.out.println("in run time invalid id exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
	}
	
	@ExceptionHandler(EmailNotFoundException.class)
	public ResponseEntity<?> emailNotFoundException(EmailNotFoundException e) {
		System.out.println("in run time invalid id exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
	}
	
	@ExceptionHandler(DuplicateEmailException.class)
	public ResponseEntity<?> duplicateEmailException(DuplicateEmailException e) {
		System.out.println("in run time invalid id exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(e.getMessage()));
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException e) {
		System.out.println("in run time invalid id exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		System.out.println("in run time exc handler");
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
	}
}
