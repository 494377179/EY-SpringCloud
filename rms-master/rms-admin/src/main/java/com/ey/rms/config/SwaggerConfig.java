package com.ey.rms.config;

import com.ey.rms.common.config.BaseSwaggerConfig;
import com.ey.rms.common.domain.SwaggerProperties;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger API文档相关配置
 * Created by louqx on 2018/4/26.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig extends BaseSwaggerConfig {

    @Override
    public SwaggerProperties swaggerProperties() {
        return SwaggerProperties.builder()
                .apiBasePackage("com.ey.rms.controller")
                .title("rms后台系统")
                .description("rms后台相关接口文档")
                .contactName("rms")
                .version("1.0")
                .enableSecurity(true)
                .build();
    }
}
