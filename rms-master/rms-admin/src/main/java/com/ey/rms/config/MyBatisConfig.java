package com.ey.rms.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * MyBatis相关配置
 * Created by louqx on 2021/1/8.
 */
@Configuration
@EnableTransactionManagement
@MapperScan({"com.ey.rms.mapper","com.ey.rms.dao"})
public class MyBatisConfig {
}
