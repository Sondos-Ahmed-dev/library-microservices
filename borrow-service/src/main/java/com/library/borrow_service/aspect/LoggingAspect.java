package com.library.borrow_service.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // الـ Logger بيكتب في الـ console
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // Pointcut — بيطبق على كل methods في كل الـ controllers
    @Pointcut("execution(* com.library.borrow_service.controller.*.*(..))")
    public void allControllerMethods() {}

    // قبل أي API call
    @Before("allControllerMethods()")
    public void logBefore(JoinPoint joinPoint) {
        logger.info(">>> API Called: {}.{}",
            joinPoint.getSignature().getDeclaringTypeName(), // اسم الـ Controller
            joinPoint.getSignature().getName()               // اسم الـ Method
        );
    }

    // بعد أي API call
    @After("allControllerMethods()")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("<<< API Finished: {}.{}",
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName()
        );
    }

    // قبل وبعد — بيقيس الوقت
    @Around("allControllerMethods()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {

        long startTime = System.currentTimeMillis();

        // شغّل الـ method الأصلية
        Object result = joinPoint.proceed();

        long duration = System.currentTimeMillis() - startTime;

        logger.info("⏱ {} executed in {} ms",
            joinPoint.getSignature().getName(),
            duration
        );

        return result;
    }
} 
