package com.xjzbfs.pojo;

import java.util.Objects;

public class OrderGoods {
    private String og_id;
    private String og_oid;
    private String og_gid;
    private String og_count;

    public String getOg_count() {
        return og_count;
    }

    public void setOg_count(String og_count) {
        this.og_count = og_count;
    }

    public String getOg_id() {
        return og_id;
    }

    public void setOg_id(String og_id) {
        this.og_id = og_id;
    }

    public String getOg_oid() {
        return og_oid;
    }

    public void setOg_oid(String og_oid) {
        this.og_oid = og_oid;
    }

    public String getOg_gid() {
        return og_gid;
    }

    public void setOg_gid(String og_gid) {
        this.og_gid = og_gid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderGoods that = (OrderGoods) o;
        return Objects.equals(og_id, that.og_id) &&
                Objects.equals(og_oid, that.og_oid) &&
                Objects.equals(og_gid, that.og_gid) &&
                Objects.equals(og_count, that.og_count);
    }

    @Override
    public int hashCode() {
        return Objects.hash(og_id, og_oid, og_gid, og_count);
    }

    @Override
    public String toString() {
        return "OrderGoods{" +
                "og_id='" + og_id + '\'' +
                ", og_oid='" + og_oid + '\'' +
                ", og_gid='" + og_gid + '\'' +
                ", og_count='" + og_count + '\'' +
                '}';
    }
}
