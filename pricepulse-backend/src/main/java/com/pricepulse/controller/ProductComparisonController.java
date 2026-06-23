package com.pricepulse.controller;

import com.pricepulse.model.Product;
import com.pricepulse.service.ProductComparisonService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comparisons")
@RequiredArgsConstructor
public class ProductComparisonController {

    private final ProductComparisonService productComparisonService;

    @GetMapping
    public ResponseEntity<List<Product>> getComparisons(@AuthenticationPrincipal String userIdStr) {
        Long userId = Long.parseLong(userIdStr);
        return ResponseEntity.ok(productComparisonService.getComparedProducts(userId));
    }

    @PostMapping
    public ResponseEntity<Product> addComparison(
            @AuthenticationPrincipal String userIdStr,
            @RequestBody SaveComparisonRequest req) {
        Long userId = Long.parseLong(userIdStr);
        Product product = productComparisonService.saveComparison(
                userId,
                req.getProductName(),
                req.getCategory(),
                req.getDescription()
        );
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeComparison(
            @AuthenticationPrincipal String userIdStr,
            @PathVariable Long productId) {
        Long userId = Long.parseLong(userIdStr);
        productComparisonService.removeComparison(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @Data
    public static class SaveComparisonRequest {
        private String productName;
        private String category;
        private String description;
    }
}
