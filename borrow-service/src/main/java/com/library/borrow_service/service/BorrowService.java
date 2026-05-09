package com.library.borrow_service.service;

import org.springframework.stereotype.Service;
import com.library.borrow_service.client.CatalogClient;
import com.library.borrow_service.dto.BookDto;


@Service
public class BorrowService {

    private final CatalogClient catalogClient;

    public BorrowService(CatalogClient catalogClient
) {
        this.catalogClient = catalogClient;
    }

    public void borrowBook(Long bookId , Long userId) {
        BookDto book = catalogClient.getBookById(bookId);

        if (book == null) {
            throw new RuntimeException("Book not found");
        }

    }
}
