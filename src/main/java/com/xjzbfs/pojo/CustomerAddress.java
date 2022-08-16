package com.xjzbfs.pojo;


import com.alibaba.fastjson.annotation.JSONField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAddress {

    private String a_id;

    private String a_cid;

    private String 	a_name;

    private String a_phone;

    private String a_address;

    private Integer a_count;

    private String a_date;

    public String getA_id() {
        return a_id;
    }

    public void setA_id(String a_id) {
        this.a_id = a_id;
    }

    public String getA_cid() {
        return a_cid;
    }

    public void setA_cid(String a_cid) {
        this.a_cid = a_cid;
    }

    public String getA_name() {
        return a_name;
    }

    public void setA_name(String a_name) {
        this.a_name = a_name;
    }

    public String getA_phone() {
        return a_phone;
    }

    public void setA_phone(String a_phone) {
        this.a_phone = a_phone;
    }

    public String getA_address() {
        return a_address;
    }

    public void setA_address(String a_address) {
        this.a_address = a_address;
    }

    public Integer getA_count() {
        return a_count;
    }

    public void setA_count(Integer a_count) {
        this.a_count = a_count;
    }

    public String getA_date() {
        return a_date;
    }

    public void setA_date(String a_date) {
        this.a_date = a_date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerAddress that = (CustomerAddress) o;
        return a_id.equals(that.a_id) &&
                a_cid.equals(that.a_cid) &&
                a_name.equals(that.a_name) &&
                a_phone.equals(that.a_phone) &&
                a_address.equals(that.a_address) &&
                a_count.equals(that.a_count) &&
                a_date.equals(that.a_date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(a_id, a_cid, a_name, a_phone, a_address, a_count, a_date);
    }

    @Override
    public String toString() {
        return "CustomerAddress{" +
                "a_id='" + a_id + '\'' +
                ", a_cid='" + a_cid + '\'' +
                ", a_name='" + a_name + '\'' +
                ", a_phone='" + a_phone + '\'' +
                ", a_address='" + a_address + '\'' +
                ", a_count=" + a_count +
                ", a_date=" + a_date +
                '}';
    }
}
