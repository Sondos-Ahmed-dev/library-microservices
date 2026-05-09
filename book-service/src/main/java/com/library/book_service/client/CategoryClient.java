package com.library.book_service.client;

import com.library.book_service.dto.CategoryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service")
public interface CategoryClient {
    @GetMapping("/categories/{id}")
    CategoryDto getCategoryById(@PathVariable Long id);
}