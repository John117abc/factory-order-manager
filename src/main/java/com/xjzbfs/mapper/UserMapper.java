package com.xjzbfs.mapper;


import com.xjzbfs.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    int registerUser(User user);
    User searchUserById(@Param("u_id")String uId);
    int updateUserPasswordById(@Param("u_id")String uId,@Param("u_password")String uPassword);
    int updateUserDateById(@Param("u_id")String uId,@Param("u_date")String uDate);
    User searchUserByName(@Param("u_name")String uName);
    User searchUserByPhone(@Param("u_phone")String uPhone);
    List <User> getAllUsers();

}
