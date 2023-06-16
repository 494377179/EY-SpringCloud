package com.ey.rms.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * 资源与角色访问对应关系操作组件
 * Created by louqx on 2021/1/17.
 */
@Component
public class ResourceRoleRulesHolder {


    @PostConstruct
    public void initResourceRolesMap(){
        /*resourceService.initResourceRolesMap();*/
    }
}
