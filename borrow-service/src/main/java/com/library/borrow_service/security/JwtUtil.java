package com.library.borrow_service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // مفتاح ثابت حتى لا تبطل التوكينات بعد كل Restart
    private static final String SECRET = "mySuperSecretKeyForLibrarySystemMicroservicesProject2026PleaseDontShare";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // مدة صلاحية الـ token — 24 ساعة
    private final long EXPIRATION = 1000 * 60 * 60 * 24;

    // إنشاء token جديد للـ username والـ role
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    // استخراج الـ username من الـ token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // استخراج الـ role من الـ token
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // التحقق إن الـ token صالح
    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}