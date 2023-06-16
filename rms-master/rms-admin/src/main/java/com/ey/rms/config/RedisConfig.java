package com.ey.rms.config;

import com.ey.rms.common.config.BaseRedisConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis相关配置
 * Created by louqx on 2021/1/19.
 */
@Configuration
public class RedisConfig extends BaseRedisConfig {

}
