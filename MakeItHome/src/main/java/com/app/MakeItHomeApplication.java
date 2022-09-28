package com.app;

import java.io.File;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MakeItHomeApplication implements CommandLineRunner {

	// @Value => annotation to inject value of SpEL expression into a field
	@Value("${file.upload.location}")
	private String folderName;

	public static void main(String[] args) {
		SpringApplication.run(MakeItHomeApplication.class, args);
	}

	// configure BCryptPassword encode bean
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	// configure model mapper bean
	@Bean
	public ModelMapper mapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("in run " + folderName);
		// create images folder if it doesn't exist
		File dir = new File(folderName);
		if (!dir.exists()) {
			System.out.println("Created folder/s " + dir.mkdirs());
		} else
			System.out.println("folder alrdy exists");

	}

}
