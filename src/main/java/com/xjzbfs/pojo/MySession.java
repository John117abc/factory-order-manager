package com.xjzbfs.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MySession {
    private String sessionId;
    private String user_id;
    private String create_time;
    private Integer user_type;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public Integer getUser_type() {
        return user_type;
    }

    public void setUser_type(Integer user_type) {
        this.user_type = user_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MySession mySession = (MySession) o;
        return Objects.equals(sessionId, mySession.sessionId) &&
                Objects.equals(user_id, mySession.user_id) &&
                Objects.equals(create_time, mySession.create_time) &&
                Objects.equals(user_type, mySession.user_type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sessionId, user_id, create_time, user_type);
    }


    @Override
    public String toString() {
        return "MySession{" +
                "sessionId='" + sessionId + '\'' +
                ", user_id='" + user_id + '\'' +
                ", create_time='" + create_time + '\'' +
                ", user_type=" + user_type +
                '}';
    }
}
