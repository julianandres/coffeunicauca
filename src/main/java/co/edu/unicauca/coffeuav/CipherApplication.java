package co.edu.unicauca.coffeuav;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
@EnableAutoConfiguration
public class CipherApplication {

    public static void main(String[] args) {
        SpringApplication.run(CipherApplication.class, args);
    }
}
