
package com.library.borrow_service.controller;

import com.library.borrow_service.model.BorrowingRecord;
import com.library.borrow_service.repository.BorrowingRepository;
import com.library.borrow_service.client.CatalogClient;
import com.library.borrow_service.dto.BookDto;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/borrow")
public class BorrowingController {

    @Autowired
    private BorrowingRepository borrowingRepository;

    @Autowired
    private CatalogClient catalogClient;


    // borrow book

    @PostMapping
    public ResponseEntity<?> borrowBook(@RequestBody BorrowingRecord record,
                                        org.springframework.security.core.Authentication authentication) {
        
        // تحقق إن اليوزر مش بالفعل مستعير الكتاب ده
        boolean alreadyBorrowed = borrowingRepository.existsByUsernameAndBookIdAndReturnedFalse(
                authentication.getName(), record.getBookId());

        if (alreadyBorrowed) {
            return ResponseEntity.badRequest().body("You already have this book borrowed");
        }

        BookDto book = catalogClient.getBookById(record.getBookId());

        if (book == null || book.getAvailableCopies() <= 0) {
            return ResponseEntity.badRequest().body("No copies available");
        }

        record.setUsername(authentication.getName());
        record.setBorrowDate(LocalDate.now());
        record.setDueDate(LocalDate.now().plusDays(7));
        record.setReturned(false);

        BorrowingRecord saved = borrowingRepository.save(record);
        catalogClient.decrementAvailableCopies(record.getBookId());
        return ResponseEntity.ok(saved);
    }

    // get all borrowings
        @GetMapping
        public List<BorrowingRecord> getAll() {
            List<BorrowingRecord> records = borrowingRepository.findAll();
            
            records.forEach(record -> {
                try {
                    BookDto book = catalogClient.getBookById(record.getBookId());
                    record.setBook(book);
                } catch (Exception e) {}
            });
            
            return records;
    }
    @GetMapping("/me")
    public List<BorrowingRecord> getMyBorrowings(
            org.springframework.security.core.Authentication authentication) {
        
        List<BorrowingRecord> records = borrowingRepository.findByUsername(authentication.getName());
        
        // جيب بيانات كل كتاب من الـ catalog-service
        records.forEach(record -> {
            try {
                BookDto book = catalogClient.getBookById(record.getBookId());
                record.setBook(book);
            } catch (Exception e) {
                // لو فشل يفضل null
            }
        });
        
        return records;
    }


    // return book
    @PutMapping("/return/{id}")
    public BorrowingRecord returnBook(@PathVariable Long id) {
        BorrowingRecord record = borrowingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        record.setReturned(true);
        record.setReturnDate(LocalDate.now());

        BorrowingRecord saved = borrowingRepository.save(record);
        catalogClient.returnBook(record.getBookId());  
            return saved;
      
    }

}