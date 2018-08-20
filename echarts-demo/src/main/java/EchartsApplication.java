import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Write class comments here
 * User: lifengming
 * Date: 2018/8/20 16:52
 */
@SpringBootApplication
@ComponentScan("controller")
public class EchartsApplication {
    public static void main(String[] args) {
        SpringApplication.run(EchartsApplication.class,args);
        System.out.println("===========================");
    }
}
