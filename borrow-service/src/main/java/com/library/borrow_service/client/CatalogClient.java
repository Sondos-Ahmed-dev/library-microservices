
package com.library.borrow_service.client;

import com.library.borrow_service.config.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.library.borrow_service.config.FeignClientConfig;
import com.library.borrow_service.dto.BookDto;

@FeignClient(name = "book-service", configuration = FeignClientConfig.class)
public interface CatalogClient {

    @GetMapping("/books/{id}")
    BookDto getBookById(@PathVariable Long id);

    @PutMapping("/books/{id}/borrow")
    void decrementAvailableCopies(@PathVariable Long id);

    @PutMapping("/books/{id}/return")
    void returnBook(@PathVariable Long id);
}
