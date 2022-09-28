package com.app.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

//AOP

@Aspect
@Component
@Slf4j
public class AfterAopAspect {

	//private Logger log = LoggerFactory.getLogger(this.getClass());

	@AfterReturning(value = "execution(* com.app.service.*.*(..))", returning = "result")
	public void afterReturning(JoinPoint joinPoint, Object result) {
		log.info("{} returned with value {}", joinPoint.getSignature(), result);
	}

	@After(value = "execution(* com.app.controller.*.*(..))")
	public void after(JoinPoint joinPoint) {
		// getSignature() : rets entire method signature.
		log.info("after execution of {}", joinPoint.getSignature());
	}

	@AfterThrowing(value = "execution(* com.app.service.*.*(..))", throwing = "exc")
	public void afterThrowing(Exception exc) {
		log.info("Exception occurred : " + exc);
	}
}