package com.pricepulse.service;

import com.pricepulse.model.SearchHistory;
import com.pricepulse.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;

    @Transactional
    public void saveSearch(Long userId, String searchQuery) {
        if (userId == null || searchQuery == null || searchQuery.isBlank()) {
            return;
        }
        // Remove older entries if they are identical to prevent duplicate clutter
        List<SearchHistory> existing = searchHistoryRepository.findByUserIdOrderByTimestampDesc(userId);
        for (SearchHistory history : existing) {
            if (history.getSearchQuery().equalsIgnoreCase(searchQuery.trim())) {
                searchHistoryRepository.delete(history);
            }
        }

        SearchHistory history = SearchHistory.builder()
                .userId(userId)
                .searchQuery(searchQuery.trim())
                .timestamp(Instant.now())
                .build();
        searchHistoryRepository.save(history);
    }

    public List<SearchHistory> getSearchHistory(Long userId) {
        return searchHistoryRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    @Transactional
    public void clearSearchHistory(Long userId) {
        searchHistoryRepository.deleteByUserId(userId);
    }
}
