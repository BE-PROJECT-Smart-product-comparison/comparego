package com.pricepulse.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "uuid", unique = true)
    private String uuid;

    @Column(name = "product_name", nullable = false)
    private String productName;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "lowest_price")
    private Long lowestPrice;

    @Column(name = "highest_rating")
    private Double highestRating;

    @Column(name = "thumbnail", length = 1000)
    private String thumbnail;

    @Column(name = "best_platform")
    private String bestPlatform;

    @Column(name = "specifications_json", columnDefinition = "TEXT")
    private String specificationsJson;

    @Column(name = "listings_json", columnDefinition = "TEXT")
    private String listingsJson;
}
