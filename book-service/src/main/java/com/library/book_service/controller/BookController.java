package com.library.book_service.controller;

import com.library.book_service.model.Book;
import com.library.book_service.repository.BookRepository;

import com.library.book_service.client.CategoryClient;
import com.library.book_service.dto.CategoryDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryClient categoryClient;

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        book.setAvailableCopies(book.getQuantity());
        return bookRepository.save(book);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        books.forEach(book -> {
            try {
                if (book.getCategoryId() != null) {
                    System.out.println("Fetching category for id: " + book.getCategoryId());
                    CategoryDto cat = categoryClient.getCategoryById(book.getCategoryId());
                    System.out.println("Got category: " + cat);
                    book.setCategoryDto(cat);
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        });
        return books;
    }


    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        List<Book> books = bookRepository.findAll();
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            try {
                CategoryDto cat = categoryClient.getCategoryById(book.getCategoryId());
                book.setCategoryDto(cat);
            } catch (Exception e) {}
        }
        return book;
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return "Book deleted";
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book updated) {
        return bookRepository.findById(id).map(b -> {
            int diff = updated.getQuantity() - b.getQuantity();
            b.setTitle(updated.getTitle());
            b.setAuthor(updated.getAuthor());
            b.setPages(updated.getPages());
            b.setQuantity(updated.getQuantity());
            b.setAvailableCopies(Math.max(0, b.getAvailableCopies() + diff));
            b.setCategoryId(updated.getCategoryId());
            return bookRepository.save(b);
        }).orElseThrow();
    }

    @PutMapping("/{id}/borrow")
    public String borrowBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) return "Book not found";
        if (book.getAvailableCopies() <= 0) return "Book not available";
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);
        return "Book borrowed";
    }

    @PutMapping("/{id}/return")
    public String returnBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) return "Book not found";
        if (book.getAvailableCopies() < book.getQuantity()) {
            book.setAvailableCopies(book.getAvailableCopies() + 1);
        }
        bookRepository.save(book);
        return "Book returned";
    }

}
