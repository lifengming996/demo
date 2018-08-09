package com.controller;

import com.aop.LogAnnotation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * create by Lfm
 * on 2018-08-08 21:34
 */
@Controller
@RequestMapping("/")
public class LogController {

    @LogAnnotation
    @RequestMapping("get")
    public void getCommentList(){
        System.out.println("test-------sussessful");
    }
}
