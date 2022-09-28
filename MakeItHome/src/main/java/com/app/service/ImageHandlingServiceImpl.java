package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.repository.CategoryRepository;
import com.app.repository.ProductRepository;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location}")
	private String baseFolder;
	
	@Value("${file.basefolder.length}")
	private int beginIndex;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private CategoryRepository categoryRepo;

	@Override
	public String storeImage(MultipartFile imageFile) throws IOException {
		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		return completePath.substring(beginIndex);
	}

	@Override
	public byte[] restoreProductImage(Long prodId) throws IOException {
		// get emp dtls from emp id
		Product product = productRepo.findById(prodId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Product Id"));
		// product => persistent
		// get complete img path from db --> extract image contents n send it to the
		// caller
		String path = product.getImagePath();
		System.out.println("img path " + path);
		// API of java.nio.file.Files class : public byte[] readAllBytes(Path path)
		return Files.readAllBytes(Paths.get(path));
		// in case of BLOB in DB --simply call emp.getImage() --> byte[] --> ret it to
		// the caller!
	}

	@Override
	public byte[] restoreCatgeoryImage(Long categoryId) throws IOException {
		Category category = categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Category Id"));
		String path = category.getImagePath();
		System.out.println("img path " + path);
		return Files.readAllBytes(Paths.get(path));
	}

}
