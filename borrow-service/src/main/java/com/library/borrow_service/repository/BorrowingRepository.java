package com.library.borrow_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.library.borrow_service.model.BorrowingRecord;

@Repository


public interface BorrowingRepository extends JpaRepository<BorrowingRecord, Long> {
    
    List<BorrowingRecord> findByUsername(String username);
    
    boolean existsByUsernameAndBookIdAndReturnedFalse(String username, Long bookId); // ← دي اللي ناقصة

}