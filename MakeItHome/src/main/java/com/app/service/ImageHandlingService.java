package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {

	String storeImage(MultipartFile imageFile) throws IOException;

	byte[] restoreProductImage(Long prodId) throws IOException;

	byte[] restoreCatgeoryImage(Long categoryId) throws IOException;

}
