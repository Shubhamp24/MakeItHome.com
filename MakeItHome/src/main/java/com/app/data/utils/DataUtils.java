package com.app.data.utils;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;

import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.service.ICategoryService;

public class DataUtils {
	private final static String CSV_FILE_NAME = "datafile";
	private final static String CSV_FILE_PATH = System.getProperty("user.dir") + File.separator + "src" + File.separator
			+ "main" + File.separator + "resources" + File.separator + "data" + File.separator + CSV_FILE_NAME
			+ ".xlsx";

//	public List<Product> readData() {
//		List<Product> products = new ArrayList<Product>();
//		try {
//			FileReader fileReader = new FileReader(new File(CSV_FILE_PATH));
//			CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();
//			Product product = new Product();
//			List<String[]> allData = csvReader.readAll();
//			System.out.println(allData.size() + "   size");
//			for (String[] row : allData) {
//				product.setProductName(row[0]);
//				product.setProductDescription(row[1]);
//				product.setPrice(Double.parseDouble(row[2]));
//				product.setStock(Integer.parseInt(row[3]));
//				product.setImagePath(row[4]);
////				product.setCategoryId(mapper.map(categoryService.findById(Long.parseLong(row[5])), Category.class));
////				products.add(product);
//				System.out.println(product);
//
//			}
//
//		} catch (IOException | CsvException e) {
//			e.printStackTrace();
//		}
//		return products;
//	}

//	public String handleStringConversion(Object object) {
//		String value = null;
//
//		if (object.equals(null))
//			value = "0";
//		else if (object instanceof Integer)
//			value = String.valueOf(object);
//		else if (object instanceof Double)
//			value = String.valueOf(object);
//		else if (object instanceof Long)
//			value = String.valueOf(object);
//		else
//			value = object.toString();
//		return value;
//	}

	public List<Product> getListsOfProducts(ModelMapper mapper, ICategoryService categoryService) {
		List<Product> listOfProducts = new ArrayList<Product>();
		try {
			FileInputStream file = new FileInputStream(new File(CSV_FILE_PATH));
			Workbook workbook = new XSSFWorkbook(file);
			Sheet sheet = workbook.getSheet("products");
			int numberOfRows = sheet.getLastRowNum();
			System.out.println("no. of rows: " + numberOfRows);

			for (int i = 1; i <= numberOfRows; i++) {
				Product product = new Product();
				product.setProductName(sheet.getRow(i).getCell(0).getStringCellValue());
				product.setProductDescription(sheet.getRow(i).getCell(1).getStringCellValue());
				product.setPrice(sheet.getRow(i).getCell(2).getNumericCellValue());

				product.setStock((int) sheet.getRow(i).getCell(3).getNumericCellValue());
				product.setImagePath(sheet.getRow(i).getCell(4).getStringCellValue());
				System.out.println((long) sheet.getRow(i).getCell(5).getNumericCellValue());
				Long catid = (long) sheet.getRow(i).getCell(5).getNumericCellValue();
				product.setCategoryId(mapper.map(categoryService.findById(catid), Category.class));
				listOfProducts.add(product);
			}

			workbook.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfProducts;

	}

}