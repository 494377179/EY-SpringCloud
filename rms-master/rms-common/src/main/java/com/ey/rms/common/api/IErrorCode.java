package com.ey.rms.common.api;

/**
 * 封装API的错误码
 * Created by louqx on 2021/1/19.
 */
public interface IErrorCode {
    long getCode();

    String getMessage();
}
