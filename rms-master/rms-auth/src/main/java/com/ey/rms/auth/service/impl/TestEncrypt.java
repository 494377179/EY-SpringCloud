package com.ey.rms.auth.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * @author : louqx
 * @description :
 * @create: 2021-01-28 23:20:16
 **/
public class TestEncrypt {
    public static void main(String[] args) {
        String pass = "123456";
        BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
        String hashPass = bcryptPasswordEncoder.encode(pass);
        System.out.println(hashPass);

        boolean f = bcryptPasswordEncoder.matches("123456",hashPass);
        System.out.println(f);

    }
}
