package com.xjzbfs.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkShop {

    private String w_id;
    private String w_name;
    private Integer w_type;
    private String w_account;
    private String w_password;
    private String w_lastdate;
    private Integer w_count;
    private Integer w_online;

    public String getW_id() {
        return w_id;
    }

    public void setW_id(String w_id) {
        this.w_id = w_id;
    }

    public String getW_name() {
        return w_name;
    }

    public void setW_name(String w_name) {
        this.w_name = w_name;
    }

    public Integer getW_type() {
        return w_type;
    }

    public void setW_type(Integer w_type) {
        this.w_type = w_type;
    }

    public String getW_account() {
        return w_account;
    }

    public void setW_account(String w_account) {
        this.w_account = w_account;
    }

    public String getW_password() {
        return w_password;
    }

    public void setW_password(String w_password) {
        this.w_password = w_password;
    }

    public String getW_lastdate() {
        return w_lastdate;
    }

    public void setW_lastdate(String w_lastdate) {
        this.w_lastdate = w_lastdate;
    }

    public Integer getW_count() {
        return w_count;
    }

    public void setW_count(Integer w_count) {
        this.w_count = w_count;
    }

    public Integer getW_online() {
        return w_online;
    }

    public void setW_online(Integer w_online) {
        this.w_online = w_online;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkShop workShop = (WorkShop) o;
        return Objects.equals(w_id, workShop.w_id) &&
                Objects.equals(w_name, workShop.w_name) &&
                Objects.equals(w_type, workShop.w_type) &&
                Objects.equals(w_account, workShop.w_account) &&
                Objects.equals(w_password, workShop.w_password) &&
                Objects.equals(w_lastdate, workShop.w_lastdate) &&
                Objects.equals(w_count, workShop.w_count) &&
                Objects.equals(w_online, workShop.w_online);
    }

    @Override
    public int hashCode() {
        return Objects.hash(w_id, w_name, w_type, w_account, w_password, w_lastdate, w_count, w_online);
    }

    @Override
    public String toString() {
        return "WorkShop{" +
                "w_id='" + w_id + '\'' +
                ", w_name='" + w_name + '\'' +
                ", w_type=" + w_type +
                ", w_account='" + w_account + '\'' +
                ", w_password='" + w_password + '\'' +
                ", w_lastdate='" + w_lastdate + '\'' +
                ", w_count=" + w_count +
                ", w_online=" + w_online +
                '}';
    }
}

