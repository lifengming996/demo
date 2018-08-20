package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Write class comments here
 * User: lifengming
 * Date: 2018/8/20 16:53
 */
@Controller
public class EchartsController {
    @RequestMapping("/test")
    public String echarts(){
        return "echarts";
    }

    @RequestMapping("/index")
    public String index(){
        return "index";
    }
}
