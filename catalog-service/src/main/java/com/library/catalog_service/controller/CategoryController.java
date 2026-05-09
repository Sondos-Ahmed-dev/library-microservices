package com.library.catalog_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.catalog_service.model.Category;
import com.library.catalog_service.repository.CategoryRepository;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // جلب كل التصنيفات — للكل
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id).orElse(null);
    }
    // إضافة تصنيف — ADMIN بس
    @PostMapping
    public String addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return "Category added successfully";
    }

    // حذف تصنيف — ADMIN بس
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return "Category deleted";
    }

    // تعديل تصنيف — ADMIN بس
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id,
                                   @RequestBody Category newCategory) {
        return categoryRepository.findById(id)
                .map(cat -> {
                    cat.setName(newCategory.getName());
                    cat.setDescription(newCategory.getDescription());
                    return categoryRepository.save(cat);
                })
                .orElse(null);
    }
    @PutMapping("/books/{id}/decrease")
    public void decreaseAvailableCopies(@PathVariable Long id) {
          // قللي availableCopies بمقدار 1
}
}