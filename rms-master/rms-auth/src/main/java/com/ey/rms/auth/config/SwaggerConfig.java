package com.ey.rms.auth.config;

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
                .apiBasePackage("com.ey.rms.auth.controller")
                .title("rms认证中心")
                .description("rms认证中心相关接口文档")
                .contactName("rms")
                .version("1.0")
                .enableSecurity(true)
                .build();
    }
    /*.contactName("louqx")*/
}
