# Auth Service Fix Plan

## Information Gathered:
- AuthServiceApplication.java is completely commented out - no entry point exists.
- application.properties has empty MySQL password which may cause connection issues.
- JwtUtil.java has duplicate commented code above the active code.

## Plan:
1. ✅ Uncomment AuthServiceApplication.java to restore the Spring Boot entry point.
2. ✅ Add MySQL password in application.properties (or switch to H2 based on user preference).
3. ✅ Clean up JwtUtil.java by removing the commented-out duplicate code.
4. ✅ Run `mvn clean compile` to verify the build.
5. ✅ Run `mvn spring-boot:run` to start the service.

## Dependent Files to Edit:
- src/main/java/com/library/auth_service/AuthServiceApplication.java
- src/main/resources/application.properties
- src/main/java/com/library/auth_service/security/JwtUtil.java

## Followup Steps:
- Verify compilation succeeds.
- Verify service starts.
- If MySQL is not available, consider switching to H2 in-memory database.


