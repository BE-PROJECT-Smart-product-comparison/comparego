package com.pricepulse.repository;

import com.pricepulse.model.ProductComparison;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductComparisonRepository extends JpaRepository<ProductComparison, Long> {
    List<ProductComparison> findByUserId(Long userId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
