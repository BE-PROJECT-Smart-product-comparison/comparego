package com.pricepulse.service;

import com.pricepulse.model.Product;
import com.pricepulse.model.ProductComparison;
import com.pricepulse.repository.ProductComparisonRepository;
import com.pricepulse.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductComparisonService {

    private final ProductComparisonRepository productComparisonRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Product saveComparison(Long userId, String productName, String category, String description) {
        // Find or create product
        Product product = productRepository.findByProductName(productName)
                .orElseGet(() -> {
                    Product newProduct = Product.builder()
                            .productName(productName)
                            .category(category)
                            .description(description)
                            .build();
                    return productRepository.save(newProduct);
                });

        // Link in product_comparison if not already linked
        if (!productComparisonRepository.existsByUserIdAndProductId(userId, product.getId())) {
            ProductComparison comparison = ProductComparison.builder()
                    .userId(userId)
                    .productId(product.getId())
                    .build();
            productComparisonRepository.save(comparison);
        }

        return product;
    }

    public List<Product> getComparedProducts(Long userId) {
        List<ProductComparison> mappings = productComparisonRepository.findByUserId(userId);
        List<Product> products = new ArrayList<>();
        for (ProductComparison map : mappings) {
            productRepository.findById(map.getProductId()).ifPresent(products::add);
        }
        return products;
    }

    @Transactional
    public void removeComparison(Long userId, Long productId) {
        productComparisonRepository.deleteByUserIdAndProductId(userId, productId);
    }
}
