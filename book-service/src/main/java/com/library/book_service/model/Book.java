package com.library.book_service.model;

import java.beans.Transient;

import jakarta.persistence.*;
import lombok.Data;
import com.library.book_service.dto.CategoryDto;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private int pages;
    
    private boolean available;
    private int quantity = 1;          
    private int availableCopies = 1;   

    private Long categoryId;

    @jakarta.persistence.Transient  
    private CategoryDto categoryDto;

}