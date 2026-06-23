package com.pricepulse.repository;

import com.pricepulse.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserIdOrderByTimestampDesc(Long userId);
    void deleteByUserId(Long userId);
}
