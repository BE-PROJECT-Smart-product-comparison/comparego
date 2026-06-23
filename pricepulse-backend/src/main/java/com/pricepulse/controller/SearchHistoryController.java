package com.pricepulse.controller;

import com.pricepulse.model.SearchHistory;
import com.pricepulse.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;

    @GetMapping
    public ResponseEntity<List<SearchHistory>> getHistory(@AuthenticationPrincipal String userIdStr) {
        Long userId = Long.parseLong(userIdStr);
        return ResponseEntity.ok(searchHistoryService.getSearchHistory(userId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearHistory(@AuthenticationPrincipal String userIdStr) {
        Long userId = Long.parseLong(userIdStr);
        searchHistoryService.clearSearchHistory(userId);
        return ResponseEntity.noContent().build();
    }
}
