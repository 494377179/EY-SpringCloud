package com.ey.rms.mapper;

import com.ey.rms.model.UmsAdmin;
import com.ey.rms.model.UmsAdminExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UmsAdminMapper {

    List<UmsAdmin> selectByExample(UmsAdminExample example);

    UmsAdmin selectByPrimaryKey(Long id);

}