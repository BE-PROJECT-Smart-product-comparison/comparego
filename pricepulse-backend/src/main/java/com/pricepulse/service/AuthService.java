package com.pricepulse.service;

import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;
import com.pricepulse.dto.AuthDtos.*;
import com.pricepulse.model.User;
import com.pricepulse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final WebClient webClient;

    @Value("${google.client-id}")
    private String googleClientId;

    // ── Email register ───────────────────────────────────────────────────────
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use.");
        }
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .provider(User.AuthProvider.EMAIL)
                .build();
        userRepository.save(user);
        return buildResponse(user);
    }

    // ── Email login ──────────────────────────────────────────────────────────
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (user.getPasswordHash() == null ||
                !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }
        return buildResponse(user);
    }

    @lombok.Data
    public static class GoogleUserPayload {
        private String subject;
        private String email;
        private String name;
    }

    // ── Google OAuth2 ────────────────────────────────────────────────────────
    public AuthResponse googleLogin(GoogleLoginRequest req) {
        GoogleUserPayload payload = verifyGoogleToken(req.getToken());

        String googleId = payload.getSubject();
        String email    = payload.getEmail();
        String name     = payload.getName();

        User user = userRepository.findByGoogleId(googleId)
                .orElseGet(() -> userRepository.findByEmail(email)
                        .map(existing -> {
                            // Link Google to existing email account
                            existing.setGoogleId(googleId);
                            return userRepository.save(existing);
                        })
                        .orElseGet(() -> {
                            User newUser = User.builder()
                                    .name(name)
                                    .email(email)
                                    .googleId(googleId)
                                    .provider(User.AuthProvider.GOOGLE)
                                    .build();
                            return userRepository.save(newUser);
                        }));

        return buildResponse(user);
    }

    // ── Refresh token ────────────────────────────────────────────────────────
    public AuthResponse refresh(RefreshRequest req) {
        if (!jwtService.isValid(req.getRefreshToken())) {
            throw new IllegalArgumentException("Invalid or expired refresh token.");
        }
        String userIdStr = jwtService.extractUserId(req.getRefreshToken());
        Long userId = Long.parseLong(userIdStr);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        return buildResponse(user);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private AuthResponse buildResponse(User user) {
        String token        = jwtService.generateToken(String.valueOf(user.getId()));
        String refreshToken = jwtService.generateRefreshToken(String.valueOf(user.getId()));

        AuthResponse.UserInfo info = new AuthResponse.UserInfo();
        info.setId(String.valueOf(user.getId()));
        info.setEmail(user.getEmail());
        info.setName(user.getName());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setRefreshToken(refreshToken);
        response.setExpiresIn(jwtService.getExpiryMs() / 1000);
        response.setUser(info);
        return response;
    }

    private GoogleUserPayload verifyGoogleToken(String accessToken) {
        try {
            Map<String, Object> response = webClient.get()
                    .uri("https://www.googleapis.com/oauth2/v3/userinfo")
                    .headers(headers -> headers.setBearerAuth(accessToken))
                    .retrieve()
                    .bodyToMono(new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            if (response == null || !response.containsKey("sub")) {
                throw new IllegalArgumentException("Invalid Google token response.");
            }

            GoogleUserPayload payload = new GoogleUserPayload();
            payload.setSubject((String) response.get("sub"));
            payload.setEmail((String) response.get("email"));
            payload.setName((String) response.get("name"));
            return payload;
        } catch (Exception e) {
            throw new IllegalArgumentException("Google token verification failed: " + e.getMessage());
        }
    }
}
