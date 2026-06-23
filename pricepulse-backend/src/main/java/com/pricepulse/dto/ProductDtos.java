package com.pricepulse.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

public class ProductDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductSearchResponse {
        private String query;
        private List<ProductResult> results;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductResult {
        private String id;
        private String title;
        private String normalizedTitle;
        private List<PlatformListing> listings;
        private Long lowestPrice;
        private Double highestRating;
        private String thumbnail;
        private List<String> specifications;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlatformListing {
        private String title;
        private String thumbnail;
        private String platform;      // "AMAZON" | "FLIPKART"
        private Long price;
        private Long originalPrice;
        private Integer discountPercent;
        private Double rating;
        private Integer reviewCount;
        private String url;
        private boolean isBestDeal;
    }
}
