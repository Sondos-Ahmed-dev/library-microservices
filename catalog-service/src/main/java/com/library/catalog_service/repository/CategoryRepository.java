package com.library.catalog_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.catalog_service.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
}
