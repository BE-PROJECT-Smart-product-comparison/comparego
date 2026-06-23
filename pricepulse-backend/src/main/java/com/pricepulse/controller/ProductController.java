package com.pricepulse.controller;

import com.pricepulse.dto.ProductDtos.*;
import com.pricepulse.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/v1/products/search?q=iPhone+15
     * Public — optional auth for search history logging
     */
    @GetMapping("/search")
    public ResponseEntity<ProductSearchResponse> search(
            @RequestParam String q,
            @AuthenticationPrincipal String userIdStr) {
        return ResponseEntity.ok(productService.search(q, userIdStr));
    }

    /**
     * GET /api/v1/products/{id}
     * Public — stub
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResult> getById(@PathVariable String id) {
        return ResponseEntity.ok(productService.getById(id));
    }
}
