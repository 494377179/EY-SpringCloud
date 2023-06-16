package com.ey.rms.common.exception;

import com.ey.rms.common.api.IErrorCode;

/**
 * 断言处理类，用于抛出各种API异常
 * Created by louqx on 2021/1/27.
 */
public class Asserts {
    public static void fail(String message) {
        throw new ApiException(message);
    }

    public static void fail(IErrorCode errorCode) {
        throw new ApiException(errorCode);
    }
}
