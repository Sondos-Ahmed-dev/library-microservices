package com.library.borrow_service.dto;

import lombok.Data;

@Data
public class BookDto {
    private Long id;
    private String title;
    private int availableCopies;
}
