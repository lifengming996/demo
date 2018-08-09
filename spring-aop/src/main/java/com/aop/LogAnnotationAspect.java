package com.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.logging.Logger;

/**
 * create by Lfm
 * on 2018-08-08 20:28
 */
@Aspect
@Component
public class LogAnnotationAspect {
    Logger logger = Logger.getLogger(LogAnnotationAspect.class.getName());

    @Pointcut("@annotation(LogAnnotation)")
    public void show() {

    }

    @Before(value = "show()")
    public void around() {
        System.out.println("哈哈---测试通过");
    }

    @After(value = "show()")
    public void around1() {
        System.out.println("哈哈---测试通过111");
    }
//    @Around(value = "show()")
//    public void around2(){
//        System.out.println("111111111111111");
//        this.around1();
//        System.out.println("2222222222222222");
//    }

}
