package com.xjzbfs.mapper;


import com.xjzbfs.pojo.MySession;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MySessionMapper {
    int insertSession(MySession mySession);
    int updateSessionByUid(MySession mySession);
    MySession searchSessionByUid(@Param("user_id")String user_id);
    MySession searchSessionBySessionId(@Param("sessionId")String sessionId);
}
