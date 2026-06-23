package com.pricepulse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.Instant;

public class FavoriteDtos {

    @Data
    public static class SaveFavoriteRequest {
        @NotBlank private String productId;
        @NotBlank private String productTitle;
        private Long lowestPrice;
        private String bestPlatform;
        private String productUrl;
    }

    @Data
    public static class FavoriteResponse {
        private String id;
        private String productId;
        private String productTitle;
        private Long lowestPrice;
        private String bestPlatform;
        private String productUrl;
        private Instant savedAt;
    }
}
