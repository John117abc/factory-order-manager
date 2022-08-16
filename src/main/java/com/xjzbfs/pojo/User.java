package com.xjzbfs.pojo;


import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String u_id;

    private String u_name;

    private String 	u_phone;

    @JSONField(serialize = false)
    private String u_password;

    private Integer u_admin;

    private String u_date;

    private String u_tname;

    public String getU_id() {
        return u_id;
    }

    public void setU_id(String u_id) {
        this.u_id = u_id;
    }

    public String getU_name() {
        return u_name;
    }

    public void setU_name(String u_name) {
        this.u_name = u_name;
    }

    public String getU_phone() {
        return u_phone;
    }

    public void setU_phone(String u_phone) {
        this.u_phone = u_phone;
    }

    public String getU_password() {
        return u_password;
    }

    public void setU_password(String u_password) {
        this.u_password = u_password;
    }

    public Integer getU_admin() {
        return u_admin;
    }

    public void setU_admin(Integer u_admin) {
        this.u_admin = u_admin;
    }

    public String getU_date() {
        return u_date;
    }

    public void setU_date(String u_date) {
        this.u_date = u_date;
    }

    public String getU_tname() {
        return u_tname;
    }

    public void setU_tname(String u_tname) {
        this.u_tname = u_tname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return u_id.equals(user.u_id) &&
                u_name.equals(user.u_name) &&
                u_phone.equals(user.u_phone) &&
                u_password.equals(user.u_password) &&
                u_admin.equals(user.u_admin) &&
                u_date.equals(user.u_date) &&
                u_tname.equals(user.u_tname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(u_id, u_name, u_phone, u_password, u_admin, u_date, u_tname);
    }

    @Override
    public String toString() {
        return "User{" +
                "u_id='" + u_id + '\'' +
                ", u_name='" + u_name + '\'' +
                ", u_phone='" + u_phone + '\'' +
                ", u_password='" + u_password + '\'' +
                ", u_admin=" + u_admin +
                ", u_date=" + u_date +
                ", u_tname='" + u_tname + '\'' +
                '}';
    }
}
