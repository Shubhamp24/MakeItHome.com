package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Category extends BaseEntity {
	@Column(name = "category_name", length = 100)
	private String categoryName;
	@Column(name = "image_path")
	private String imagePath;

	public Category(String categoryName, String imagePath) {
		super();
		this.categoryName = categoryName;
		this.imagePath = imagePath;
	}

}
