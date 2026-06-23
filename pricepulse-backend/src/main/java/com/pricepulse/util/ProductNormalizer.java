package com.pricepulse.util;

import com.pricepulse.dto.ProductDtos.*;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class ProductNormalizer {

    private static final Set<String> STOP_WORDS = Set.of(
            "with", "for", "by", "the", "and", "in", "a", "an",
            "of", "to", "at", "or", "on", "is", "it", "new", "latest"
    );

    /**
     * Groups raw platform listings into multiple distinct ProductResult objects
     * based on title similarity, keeping only the best price per platform.
     */
    public List<ProductResult> normalize(String query, List<PlatformListing> allListings) {
        List<ProductResult> groups = new ArrayList<>();

        for (PlatformListing listing : allListings) {
            if (listing.getTitle() == null || listing.getTitle().isBlank()) continue;

            ProductResult matchedGroup = null;
            for (ProductResult group : groups) {
                if (isSimilar(group.getTitle(), listing.getTitle())) {
                    matchedGroup = group;
                    break;
                }
            }

            if (matchedGroup != null) {
                matchedGroup.getListings().add(listing);
            } else {
                ProductResult newGroup = ProductResult.builder()
                        .title(listing.getTitle())
                        .normalizedTitle(normalizeTitle(listing.getTitle()))
                        .listings(new ArrayList<>(List.of(listing)))
                        .thumbnail(listing.getThumbnail())
                        .build();
                groups.add(newGroup);
            }
        }

        // Post-process each group
        for (ProductResult group : groups) {
            // Group listings by platform and keep the cheapest one
            Map<String, PlatformListing> bestPerPlatform = new LinkedHashMap<>();
            for (PlatformListing l : group.getListings()) {
                bestPerPlatform.merge(l.getPlatform(), l,
                        (existing, incoming) -> incoming.getPrice() < existing.getPrice() ? incoming : existing);
            }

            List<PlatformListing> dedupedListings = new ArrayList<>(bestPerPlatform.values());
            group.setListings(dedupedListings);

            // Find lowest price
            long lowestPrice = dedupedListings.stream()
                    .mapToLong(PlatformListing::getPrice)
                    .min().orElse(0L);
            group.setLowestPrice(lowestPrice);

            // Mark best deal
            dedupedListings.stream()
                    .filter(l -> l.getPrice() == lowestPrice)
                    .findFirst()
                    .ifPresent(l -> l.setBestDeal(true));

            // Find highest rating
            double highestRating = dedupedListings.stream()
                    .filter(l -> l.getRating() != null)
                    .mapToDouble(PlatformListing::getRating)
                    .max().orElse(0.0);
            group.setHighestRating(highestRating > 0 ? highestRating : null);

            // Set thumbnail from first listing if group thumbnail is missing
            if ((group.getThumbnail() == null || group.getThumbnail().isBlank()) && !dedupedListings.isEmpty()) {
                group.setThumbnail(dedupedListings.get(0).getThumbnail());
            }

            // Generate UUID for product identification
            String cleanTitle = group.getTitle().toLowerCase().replaceAll("[^a-z0-9]", "");
            String productId = UUID.nameUUIDFromBytes(cleanTitle.getBytes()).toString();
            group.setId(productId);

            // Generate specifications for this product
            group.setSpecifications(generateMockSpecs(group.getTitle()));
        }

        // Sort groups so that products with more listings and better prices come first
        groups.sort((g1, g2) -> {
            int listingsCompare = Integer.compare(g2.getListings().size(), g1.getListings().size());
            if (listingsCompare != 0) return listingsCompare;
            return Long.compare(g1.getLowestPrice(), g2.getLowestPrice());
        });

        return groups;
    }

    private boolean isSimilar(String title1, String title2) {
        Set<String> tokens1 = getTokens(title1);
        Set<String> tokens2 = getTokens(title2);

        if (tokens1.isEmpty() || tokens2.isEmpty()) return false;

        Set<String> intersection = new HashSet<>(tokens1);
        intersection.retainAll(tokens2);

        double overlap = (double) intersection.size() / Math.min(tokens1.size(), tokens2.size());
        return overlap >= 0.70; // 70% overlap matches similar listings
    }

    private Set<String> getTokens(String title) {
        String[] words = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", " ")
                .split("\\s+");
        Set<String> tokens = new HashSet<>();
        for (String word : words) {
            if (!word.isBlank() && !STOP_WORDS.contains(word)) {
                tokens.add(word);
            }
        }
        return tokens;
    }

    public String normalizeTitle(String title) {
        return Arrays.stream(title.toLowerCase().split("\\s+"))
                .filter(word -> !STOP_WORDS.contains(word))
                .collect(Collectors.joining(" "));
    }

    private List<String> generateMockSpecs(String title) {
        List<String> specs = new ArrayList<>();
        String lowerTitle = title.toLowerCase();

        // Detect brand
        String brand = "Generic";
        if (lowerTitle.contains("apple") || lowerTitle.contains("iphone")) brand = "Apple";
        else if (lowerTitle.contains("samsung")) brand = "Samsung";
        else if (lowerTitle.contains("oneplus")) brand = "OnePlus";
        else if (lowerTitle.contains("google") || lowerTitle.contains("pixel")) brand = "Google";
        else if (lowerTitle.contains("xiaomi") || lowerTitle.contains("redmi")) brand = "Xiaomi";
        else if (lowerTitle.contains("hp")) brand = "HP";
        else if (lowerTitle.contains("dell")) brand = "Dell";
        else if (lowerTitle.contains("lenovo")) brand = "Lenovo";
        else if (lowerTitle.contains("asus")) brand = "ASUS";
        else if (lowerTitle.contains("sony")) brand = "Sony";

        // Detect storage
        String storage = "128 GB";
        if (lowerTitle.contains("256gb") || lowerTitle.contains("256 gb")) storage = "256 GB";
        else if (lowerTitle.contains("512gb") || lowerTitle.contains("512 gb")) storage = "512 GB";
        else if (lowerTitle.contains("1tb") || lowerTitle.contains("1 tb")) storage = "1 TB";
        else if (lowerTitle.contains("64gb") || lowerTitle.contains("64 gb")) storage = "64 GB";

        if (lowerTitle.contains("iphone") || lowerTitle.contains("galaxy") || lowerTitle.contains("oneplus") || lowerTitle.contains("pixel") || lowerTitle.contains("phone")) {
            specs.add("Brand: " + brand);
            specs.add("Category: Mobile Phone");
            specs.add("Storage: " + storage);
            specs.add("RAM: " + (lowerTitle.contains("pro") || lowerTitle.contains("ultra") || lowerTitle.contains("256gb") ? "8 GB" : "6 GB"));
            specs.add("Display: " + (lowerTitle.contains("plus") || lowerTitle.contains("max") || lowerTitle.contains("ultra") ? "6.7-inch OLED" : "6.1-inch OLED"));
            specs.add("Battery: " + (lowerTitle.contains("plus") || lowerTitle.contains("max") || lowerTitle.contains("ultra") ? "4300 mAh" : "3200 mAh"));
        } else if (lowerTitle.contains("laptop") || lowerTitle.contains("macbook") || lowerTitle.contains("notebook")) {
            specs.add("Brand: " + brand);
            specs.add("Category: Laptop");
            specs.add("Display: " + (lowerTitle.contains("macbook") && lowerTitle.contains("16") ? "16.2-inch Liquid Retina" : "15.6-inch Full HD"));
            specs.add("CPU: " + (lowerTitle.contains("macbook") ? "Apple M-Series" : "Intel Core i5 / AMD Ryzen 5"));
            specs.add("RAM: " + (lowerTitle.contains("16gb") || lowerTitle.contains("16 gb") ? "16 GB" : "8 GB"));
            specs.add("Storage: " + (lowerTitle.contains("256gb") ? "256 GB SSD" : "512 GB SSD"));
        } else {
            specs.add("Brand: " + brand);
            specs.add("Category: Electronics");
            specs.add("Warranty: 1 Year Manufacturer Warranty");
            specs.add("In the Box: Main Unit, Charging Cable, User Manual");
        }

        return specs;
    }
}
