package com.ey.rms.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.BCrypt;
import cn.hutool.json.JSONUtil;
import com.github.pagehelper.PageHelper;
import com.ey.rms.common.api.CommonResult;
import com.ey.rms.common.api.ResultCode;
import com.ey.rms.common.constant.AuthConstant;
import com.ey.rms.common.domain.UserDto;
import com.ey.rms.common.exception.Asserts;
import com.ey.rms.mapper.UmsAdminMapper;
import com.ey.rms.model.*;
import com.ey.rms.service.AuthService;
import com.ey.rms.service.UmsAdminCacheService;
import com.ey.rms.service.UmsAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

/**
 * UmsAdminService实现类
 * Created by louqx on 2018/4/26.
 */
@Service
public class UmsAdminServiceImpl implements UmsAdminService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UmsAdminServiceImpl.class);
    @Autowired
    private UmsAdminMapper adminMapper;
    @Autowired
    private AuthService authService;
    @Autowired
    private UmsAdminCacheService adminCacheService;
/*    @Autowired
    private HttpServletRequest request;*/
    @Override
    public UmsAdmin getAdminByUsername(String username) {
        UmsAdminExample example = new UmsAdminExample();
        example.createCriteria().andUsernameEqualTo(username);
        List<UmsAdmin> adminList = adminMapper.selectByExample(example);
        if (adminList != null && adminList.size() > 0) {
            return adminList.get(0);
        }
        return null;
    }
    @Override
    public CommonResult login(String username, String password) {
        if(StrUtil.isEmpty(username)||StrUtil.isEmpty(password)){
            Asserts.fail("用户名或密码不能为空！");
        }
        Map<String, String> params = new HashMap<>();
        params.put("client_id", AuthConstant.ADMIN_CLIENT_ID);//admin-app
        params.put("client_secret","123456");
        params.put("grant_type","password");
        params.put("username",username);
        params.put("password",password);
        CommonResult restResult = authService.getAccessToken(params);
        if(ResultCode.SUCCESS.getCode()==restResult.getCode()&&restResult.getData()!=null){

        }
        return restResult;
    }
    @Override
    public UmsAdmin getCurrentAdmin() {
        UmsAdmin admin=null;
       /* String userStr = request.getHeader(AuthConstant.USER_TOKEN_HEADER);
        if(StrUtil.isEmpty(userStr)){
            Asserts.fail(ResultCode.UNAUTHORIZED);
        }
        UserDto userDto = JSONUtil.toBean(userStr, UserDto.class);
        UmsAdmin admin = adminCacheService.getAdmin(userDto.getId());
        if(admin!=null){
            return admin;
        }else{
            admin = adminMapper.selectByPrimaryKey(userDto.getId());
            adminCacheService.setAdmin(admin);
            return admin;
        }*/
        return admin;
    }
    @Override
    public List<UmsAdmin> list(String keyword, Integer pageSize, Integer pageNum) {
        PageHelper.startPage(pageNum, pageSize);
        UmsAdminExample example = new UmsAdminExample();
        UmsAdminExample.Criteria criteria = example.createCriteria();
        if (!StringUtils.isEmpty(keyword)) {
            criteria.andUsernameLike("%" + keyword + "%");
            example.or(example.createCriteria().andNickNameLike("%" + keyword + "%"));
        }
        return adminMapper.selectByExample(example);
    }


    @Override
    public UmsAdmin getItem(Long id) {
        return adminMapper.selectByPrimaryKey(id);
    }

    @Override
    public UserDto loadUserByUsername(String username){
        //获取用户信息
        UserDto userDTO = new UserDto();
        UmsAdmin admin = getAdminByUsername(username);
        BeanUtils.copyProperties(admin,userDTO);
        return userDTO;
    }
}
