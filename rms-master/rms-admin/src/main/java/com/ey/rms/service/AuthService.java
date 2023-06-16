package com.ey.rms.service;

import com.ey.rms.common.api.CommonResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

/**
 * 认证服务远程调用
 * Created by louqx on 2021/1/19.
 */
@FeignClient("rms-auth")
public interface AuthService {

    @PostMapping(value = "/oauth/token")
    CommonResult getAccessToken(@RequestParam Map<String, String> parameters);

}
