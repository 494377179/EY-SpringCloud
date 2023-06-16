package com.ey.rms.service;

import com.ey.rms.common.api.CommonResult;
import com.ey.rms.common.domain.UserDto;
import com.ey.rms.dto.UmsAdminParam;
import com.ey.rms.dto.UpdateAdminPasswordParam;
import com.ey.rms.model.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 后台管理员Service
 * Created by louqx on 2018/4/26.
 */
public interface UmsAdminService {
    /**
     * 根据用户名获取后台管理员
     */
    UmsAdmin getAdminByUsername(String username);

    /**
     * 登录功能
     * @param username 用户名
     * @param password 密码
     * @return 调用认证中心返回结果
     */
    CommonResult login(String username, String password);

    /**
     * 根据用户id获取用户
     */
    UmsAdmin getItem(Long id);

    /**
     * 根据用户名或昵称分页查询用户
     */
    List<UmsAdmin> list(String keyword, Integer pageSize, Integer pageNum);

    /**
     * 获取用户信息
     */
    UserDto loadUserByUsername(String username);

    /**
     * 获取当前登录后台用户
     */
    UmsAdmin getCurrentAdmin();
}
