package com.ey.rms.auth.domain;

import com.ey.rms.common.domain.UserDto;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

/**
 * 登录用户信息
 * Created by louqx on 2021/1/19.
 */
@Data
public class SecurityUser implements UserDetails {

    /**
     * ID
     */
    private Long id;
    /**
     * 用户名
     */
    private String username;
    /**
     * 用户密码
     */
    private String password;
    /**
     * 用户状态
     */
    private Boolean enabled;
    /**
     * 登录客户端ID
     */
    private String clientId;
    /**
     * 权限数据
     */
    private Collection<SimpleGrantedAuthority> authorities;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public void setAuthorities(Collection<SimpleGrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public SecurityUser() {

    }

    public SecurityUser(UserDto userDto) {
        this.setId(userDto.getId());
        this.setUsername(userDto.getUsername());
        this.setPassword(userDto.getPassword());
        this.setEnabled(userDto.getStatus() == 1);
        this.setClientId(userDto.getClientId());
        if (userDto.getRoles() != null) {
            authorities = new ArrayList<>();
            userDto.getRoles().forEach(item -> authorities.add(new SimpleGrantedAuthority(item)));
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
