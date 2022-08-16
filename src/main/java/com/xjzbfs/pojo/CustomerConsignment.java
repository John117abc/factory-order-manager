package com.xjzbfs.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerConsignment {

    private String co_id;
    private String co_cid;
    private String co_department;
    private Integer co_count;
    private String co_date;
    private String co_phone;
    private String co_name;

    public String getCo_phone() {
        return co_phone;
    }

    public void setCo_phone(String co_phone) {
        this.co_phone = co_phone;
    }

    public String getCo_name() {
        return co_name;
    }

    public void setCo_name(String co_name) {
        this.co_name = co_name;
    }

    public String getCo_id() {
        return co_id;
    }

    public void setCo_id(String co_id) {
        this.co_id = co_id;
    }

    public String getCo_cid() {
        return co_cid;
    }

    public void setCo_cid(String co_cid) {
        this.co_cid = co_cid;
    }

    public String getCo_department() {
        return co_department;
    }

    public void setCo_department(String co_department) {
        this.co_department = co_department;
    }

    public Integer getCo_count() {
        return co_count;
    }

    public void setCo_count(Integer co_count) {
        this.co_count = co_count;
    }

    public String getCo_date() {
        return co_date;
    }

    public void setCo_date(String co_date) {
        this.co_date = co_date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerConsignment that = (CustomerConsignment) o;
        return Objects.equals(co_id, that.co_id) &&
                Objects.equals(co_cid, that.co_cid) &&
                Objects.equals(co_department, that.co_department) &&
                Objects.equals(co_count, that.co_count) &&
                Objects.equals(co_date, that.co_date) &&
                Objects.equals(co_phone, that.co_phone) &&
                Objects.equals(co_name, that.co_name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(co_id, co_cid, co_department, co_count, co_date, co_phone, co_name);
    }

    @Override
    public String toString() {
        return "CustomerConsignment{" +
                "co_id='" + co_id + '\'' +
                ", co_cid='" + co_cid + '\'' +
                ", co_department='" + co_department + '\'' +
                ", co_count=" + co_count +
                ", co_date='" + co_date + '\'' +
                ", co_phone='" + co_phone + '\'' +
                ", co_name='" + co_name + '\'' +
                '}';
    }
}
