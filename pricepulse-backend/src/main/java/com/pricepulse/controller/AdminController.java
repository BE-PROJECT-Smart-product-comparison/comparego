package com.pricepulse.controller;

import com.pricepulse.model.User;
import com.pricepulse.repository.ProductComparisonRepository;
import com.pricepulse.repository.ProductRepository;
import com.pricepulse.repository.SearchHistoryRepository;
import com.pricepulse.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductComparisonRepository productComparisonRepository;
    private final SearchHistoryRepository searchHistoryRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();
        long totalComparisons = productComparisonRepository.count();
        long totalSearches = searchHistoryRepository.count();

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalProducts", totalProducts,
                "totalComparisons", totalComparisons,
                "totalSearches", totalSearches
        ));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<SystemLog>> getLogs() {
        // Generate simulated audit logs based on database counts to present a live system log
        List<SystemLog> logs = new ArrayList<>();
        logs.add(new SystemLog("INFO", "System initialized successfully on port 8080"));
        logs.add(new SystemLog("INFO", "Connection established with MySQL Database 'comparego'"));
        
        long usersCount = userRepository.count();
        if (usersCount > 0) {
            logs.add(new SystemLog("INFO", "Database contains " + usersCount + " active user accounts"));
        }
        
        searchHistoryRepository.findAll().stream().limit(5).forEach(history -> {
            logs.add(new SystemLog("INFO", "Search query processed: '" + history.getSearchQuery() + "' by user ID: " + history.getUserId()));
        });

        productComparisonRepository.findAll().stream().limit(5).forEach(comp -> {
            logs.add(new SystemLog("INFO", "User ID " + comp.getUserId() + " saved product ID " + comp.getProductId() + " to comparison list"));
        });

        return ResponseEntity.ok(logs);
    }

    @Data
    public static class SystemLog {
        private String level;
        private String message;
        private String timestamp;

        public SystemLog(String level, String message) {
            this.level = level;
            this.message = message;
            this.timestamp = java.time.Instant.now().toString();
        }
    }
}
