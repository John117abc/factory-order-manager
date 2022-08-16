package com.xjzbfs.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stock {

    private String s_id;
    private String s_oid;
    private String s_gid;
    private String s_idate;
    private String s_odate;
    private Integer s_status;

    public Integer getS_status() {
        return s_status;
    }

    public void setS_status(Integer s_status) {
        this.s_status = s_status;
    }

    public String getS_id() {
        return s_id;
    }

    public void setS_id(String s_id) {
        this.s_id = s_id;
    }

    public String getS_oid() {
        return s_oid;
    }

    public void setS_oid(String s_oid) {
        this.s_oid = s_oid;
    }

    public String getS_gid() {
        return s_gid;
    }

    public void setS_gid(String s_gid) {
        this.s_gid = s_gid;
    }

    public String getS_idate() {
        return s_idate;
    }

    public void setS_idate(String s_idate) {
        this.s_idate = s_idate;
    }

    public String getS_odate() {
        return s_odate;
    }

    public void setS_odate(String s_odate) {
        this.s_odate = s_odate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stock stock = (Stock) o;
        return Objects.equals(s_id, stock.s_id) &&
                Objects.equals(s_oid, stock.s_oid) &&
                Objects.equals(s_gid, stock.s_gid) &&
                Objects.equals(s_idate, stock.s_idate) &&
                Objects.equals(s_odate, stock.s_odate) &&
                Objects.equals(s_status, stock.s_status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(s_id, s_oid, s_gid, s_idate, s_odate, s_status);
    }

    @Override
    public String toString() {
        return "Stock{" +
                "s_id='" + s_id + '\'' +
                ", s_oid='" + s_oid + '\'' +
                ", s_gid='" + s_gid + '\'' +
                ", s_idate='" + s_idate + '\'' +
                ", s_odate='" + s_odate + '\'' +
                ", s_status=" + s_status +
                '}';
    }
}
