package com.xjzbfs.pojo;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    private String c_id;

    private String c_region;

    private String c_company;

    private String c_name;

    private String c_phone;

    public String getC_id() {
        return c_id;
    }

    public void setC_id(String c_id) {
        this.c_id = c_id;
    }

    public String getC_region() {
        return c_region;
    }

    public void setC_region(String c_region) {
        this.c_region = c_region;
    }

    public String getC_company() {
        return c_company;
    }

    public void setC_company(String c_company) {
        this.c_company = c_company;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    public String getC_phone() {
        return c_phone;
    }

    public void setC_phone(String c_phone) {
        this.c_phone = c_phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return c_id.equals(customer.c_id) &&
                c_region.equals(customer.c_region) &&
                c_company.equals(customer.c_company) &&
                c_name.equals(customer.c_name) &&
                c_phone.equals(customer.c_phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(c_id, c_region, c_company, c_name, c_phone);
    }


    @Override
    public String toString() {
        return "Customer{" +
                "c_id='" + c_id + '\'' +
                ", c_region='" + c_region + '\'' +
                ", c_company='" + c_company + '\'' +
                ", c_name='" + c_name + '\'' +
                ", c_phone='" + c_phone + '\'' +
                '}';
    }
}
