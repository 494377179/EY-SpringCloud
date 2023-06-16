package com.ey.rms.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication(scanBasePackages = "com.ey.rms")
public class RmsAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(RmsAuthApplication.class, args);
    }

}
