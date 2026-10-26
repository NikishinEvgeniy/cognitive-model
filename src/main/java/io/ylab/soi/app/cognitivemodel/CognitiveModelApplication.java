package io.ylab.soi.app.cognitivemodel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "io.ylab.soi.app.cognitivemodel.feature.eigenvalue")
public class CognitiveModelApplication {
    public static void main(String[] args) {
        SpringApplication.run(CognitiveModelApplication.class, args);
    }
}