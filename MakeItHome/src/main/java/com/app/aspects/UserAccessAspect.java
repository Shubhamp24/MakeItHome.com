package com.app.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

//AOP

@Aspect // to tell SC , class below contains cross cutting concerns(i.e repeatative task)
@Component // to tell SC : it's a spring bean (i.e manage it's life cycle)
public class UserAccessAspect {

	private Logger logger = LoggerFactory.getLogger(UserAccessAspect.class);

	// What kind of method calls It would intercept ? : Methods having ANY ret type
	// , from the pkg : com.app.service , any class having any args
	// execution(* PACKAGE.*.*(..))
	// Weaving & Weaver
	@Before("execution(* com.app.service.*.*(..))")
	public void before(JoinPoint joinPoint) {
		// Advice
		logger.info(" Check for user access ");
		logger.info(" Allowed execution for {}", joinPoint);
	}
}