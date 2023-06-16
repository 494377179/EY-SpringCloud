package com.ey.rms.auth.service;

import com.ey.rms.common.domain.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by louqx on 2021/1/16.
 */
@FeignClient("mall-portal")
public interface UmsMemberService {
    @GetMapping("/sso/loadByUsername")
    UserDto loadUserByUsername(@RequestParam String username);
}
