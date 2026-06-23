package com.pricepulse.service;

import com.pricepulse.dto.ProductDtos.PlatformListing;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class SerpApiService {

    @Value("${serp.api.key}")
    private String apiKey;

    @Value("${serp.api.base-url:https://serpapi.com/search}")
    private String baseUrl;

    private final WebClient webClient = WebClient.builder()
            .codecs(c -> c.defaultCodecs().maxInMemorySize(5 * 1024 * 1024))
            .build();

    /**
     * Fetches Google Shopping results for a query,
     * then splits listings into Amazon vs Flipkart by URL.
     */
    public List<PlatformListing> fetchAllListings(String query) {
        log.debug("Fetching listings for query: {}", query);

        // Single search — no site filter (Google Shopping doesn't support it)
        List<Map<String, Object>> rawItems = fetchShoppingResults(query);
        log.debug("Total raw items from SerpAPI: {}", rawItems.size());

        List<PlatformListing> listings = new ArrayList<>();
        for (Map<String, Object> item : rawItems) {
            PlatformListing listing = mapToListing(item);
            if (listing != null) listings.add(listing);
        }

        log.debug("Total parsed listings: {}", listings.size());
        return listings;
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> fetchShoppingResults(String query) {
        try {
            Map<String, Object> response = webClient.get()
                    .uri(uriBuilder -> {
                        java.net.URI baseUri = java.net.URI.create(baseUrl);
                        return uriBuilder
                                .scheme(baseUri.getScheme())
                                .host(baseUri.getHost())
                                .path(baseUri.getPath())
                                .queryParam("engine", "google_shopping")
                                .queryParam("q", query)
                                .queryParam("gl", "in")
                                .queryParam("hl", "en")
                                .queryParam("num", "20")
                                .queryParam("output", "json")
                                .queryParam("api_key", apiKey)
                                .build();
                    })
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null) {
                log.warn("Null response from SerpAPI");
                return List.of();
            }

            if (response.containsKey("error")) {
                log.error("SerpAPI error: {}", response.get("error"));
                return List.of();
            }

            log.debug("SerpAPI response keys: {}", response.keySet());

            // Try shopping_results first, then inline_shopping_results
            if (response.containsKey("shopping_results")) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("shopping_results");
                log.debug("Found {} shopping_results", results.size());
                return results;
            }

            if (response.containsKey("inline_shopping_results")) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("inline_shopping_results");
                log.debug("Found {} inline_shopping_results", results.size());
                return results;
            }

            log.warn("No shopping results key found. Available keys: {}", response.keySet());
            return List.of();

        } catch (Exception e) {
            log.error("SerpAPI call failed: {}", e.getMessage(), e);
            return List.of();
        }
    }

    private PlatformListing mapToListing(Map<String, Object> item) {
        // Determine platform from source or link
        String source = String.valueOf(item.getOrDefault("source", "")).toLowerCase();
        String link   = String.valueOf(item.getOrDefault("link",
                         item.getOrDefault("product_link", ""))).toLowerCase();

        String platform;
        if (source.contains("amazon") || link.contains("amazon.in")) {
            platform = "AMAZON";
        } else if (source.contains("flipkart") || link.contains("flipkart.com")) {
            platform = "FLIPKART";
        } else if (source.contains("croma") || link.contains("croma.com")) {
            platform = "CROMA";
        } else if (source.contains("reliance") || link.contains("reliancedigital.in")) {
            platform = "RELIANCE";
        } else if (source.contains("vijay") || link.contains("vijaysales.com")) {
            platform = "VIJAY_SALES";
        } else if (source.contains("jiomart") || link.contains("jiomart.com")) {
            platform = "JIOMART";
        } else if (source.contains("myntra") || link.contains("myntra.com")) {
            platform = "MYNTRA";
        } else if (source.contains("ajio") || link.contains("ajio.com")) {
            platform = "AJIO";
        } else if (source.contains("tatacliq") || link.contains("tatacliq.com")) {
            platform = "TATA_CLIQ";
        } else if (!source.isBlank()) {
            // Format source name to title case
            platform = Arrays.stream(source.split("\\s+"))
                    .map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase())
                    .collect(Collectors.joining(" "));
        } else {
            platform = "Retailer";
        }

        String url = String.valueOf(item.getOrDefault("link",
                      item.getOrDefault("product_link", "")));
        if (url.isBlank() || url.equals("null")) return null;

        // Parse price — try extracted_price (number) first, then price (string)
        Long price = null;
        Object extractedPrice = item.get("extracted_price");
        if (extractedPrice instanceof Number) {
            price = ((Number) extractedPrice).longValue();
        } else {
            price = parsePrice(item.get("price"));
        }

        if (price == null || price == 0) {
            log.debug("Skipping item with no price from {}: {}", platform, item.get("title"));
            return null;
        }

        // Original price
        Long originalPrice = null;
        Object extractedOldPrice = item.get("extracted_old_price");
        if (extractedOldPrice instanceof Number) {
            originalPrice = ((Number) extractedOldPrice).longValue();
        } else {
            originalPrice = parsePrice(item.get("old_price"));
        }

        Double rating     = parseDouble(item.getOrDefault("rating", item.get("stars")));
        Integer reviews   = parseInt(item.getOrDefault("reviews", item.get("reviews_count")));

        int discount = 0;
        if (originalPrice != null && originalPrice > price) {
            discount = (int) Math.round(((double)(originalPrice - price) / originalPrice) * 100);
        }

        String itemTitle = String.valueOf(item.getOrDefault("title", ""));
        String thumbnail = String.valueOf(item.getOrDefault("thumbnail", ""));

        log.debug("Mapped listing: platform={} price={} title={} url={}", platform, price, itemTitle, url);

        return PlatformListing.builder()
                .title(itemTitle)
                .thumbnail(thumbnail)
                .platform(platform)
                .price(price)
                .originalPrice(originalPrice)
                .discountPercent(discount)
                .rating(rating)
                .reviewCount(reviews)
                .url(url)
                .isBestDeal(false)
                .build();
    }

    private Long parsePrice(Object raw) {
        if (raw == null) return null;
        try {
            if (raw instanceof Number) return ((Number) raw).longValue();
            String cleaned = raw.toString()
                    .replace("₹", "").replace(",", "")
                    .replace("$", "").replace(" ", "").trim();
            if (cleaned.isEmpty()) return null;
            return (long) Double.parseDouble(cleaned);
        } catch (NumberFormatException e) { return null; }
    }

    private Double parseDouble(Object raw) {
        if (raw == null) return null;
        try {
            if (raw instanceof Number) return ((Number) raw).doubleValue();
            return Double.parseDouble(raw.toString().trim());
        } catch (NumberFormatException e) { return null; }
    }

    private Integer parseInt(Object raw) {
        if (raw == null) return null;
        try {
            if (raw instanceof Number) return ((Number) raw).intValue();
            String cleaned = raw.toString().replaceAll("[^0-9]", "");
            return cleaned.isEmpty() ? null : Integer.parseInt(cleaned);
        } catch (NumberFormatException e) { return null; }
    }
}