package com.pricepulse.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pricepulse.dto.ProductDtos.*;
import com.pricepulse.model.Product;
import com.pricepulse.repository.ProductRepository;
import com.pricepulse.util.ProductNormalizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final SerpApiService serpApiService;
    private final ProductNormalizer normalizer;
    private final SearchHistoryService searchHistoryService;
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public ProductSearchResponse search(String query, String userIdStr) {
        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException("Query must not be empty.");
        }

        String trimmedQuery = query.trim();

        // Save search history if user is logged in
        if (userIdStr != null) {
            try {
                Long userId = Long.parseLong(userIdStr);
                searchHistoryService.saveSearch(userId, trimmedQuery);
            } catch (Exception e) {
                // Log and ignore to prevent search failure on auth issues
            }
        }

        // Fetch from both platforms in parallel
        List<PlatformListing> allListings = serpApiService.fetchAllListings(trimmedQuery);

        // Normalize and group
        List<ProductResult> results = normalizer.normalize(trimmedQuery, allListings);

        // Store product details in the database
        saveProductResultsToDb(results);

        return ProductSearchResponse.builder()
                .query(trimmedQuery)
                .results(results)
                .build();
    }

    private void saveProductResultsToDb(List<ProductResult> results) {
        for (ProductResult res : results) {
            try {
                // Find existing product by UUID or Title
                Product product = productRepository.findByUuid(res.getId())
                        .or(() -> productRepository.findByProductName(res.getTitle()))
                        .orElse(new Product());

                product.setUuid(res.getId());
                product.setProductName(res.getTitle());
                product.setLowestPrice(res.getLowestPrice());
                product.setHighestRating(res.getHighestRating());
                product.setThumbnail(res.getThumbnail());

                // Find best platform (the one with the lowest price)
                String bestPlatform = "AMAZON";
                if (res.getListings() != null && !res.getListings().isEmpty()) {
                    PlatformListing best = res.getListings().stream()
                            .filter(PlatformListing::isBestDeal)
                            .findFirst()
                            .orElse(res.getListings().get(0));
                    bestPlatform = best.getPlatform();
                }
                product.setBestPlatform(bestPlatform);

                if (res.getSpecifications() != null) {
                    product.setSpecificationsJson(objectMapper.writeValueAsString(res.getSpecifications()));
                }
                if (res.getListings() != null) {
                    product.setListingsJson(objectMapper.writeValueAsString(res.getListings()));
                }

                productRepository.save(product);
            } catch (Exception e) {
                log.error("Failed to store product details in DB: {}", e.getMessage(), e);
            }
        }
    }

    public ProductResult getById(String id) {
        throw new UnsupportedOperationException(
                "Use /search endpoint to find products.");
    }
}
