package com.xjzbfs.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goods {

    private String g_id;
    private String g_cid;
    private String g_name;
    private String g_production;
    private String g_size;
    private String g_csize;
    private String g_psize;
    private String g_specifications;
    private String g_unit;
    private BigDecimal g_price;
    private String g_type;
    private String g_explain;

    public String getG_id() {
        return g_id;
    }

    public void setG_id(String g_id) {
        this.g_id = g_id;
    }

    public String getG_cid() {
        return g_cid;
    }

    public void setG_cid(String g_cid) {
        this.g_cid = g_cid;
    }

    public String getG_name() {
        return g_name;
    }

    public void setG_name(String g_name) {
        this.g_name = g_name;
    }

    public String getG_production() {
        return g_production;
    }

    public void setG_production(String g_production) {
        this.g_production = g_production;
    }

    public String getG_size() {
        return g_size;
    }

    public void setG_size(String g_size) {
        this.g_size = g_size;
    }

    public String getG_csize() {
        return g_csize;
    }

    public void setG_csize(String g_csize) {
        this.g_csize = g_csize;
    }

    public String getG_psize() {
        return g_psize;
    }

    public void setG_psize(String g_psize) {
        this.g_psize = g_psize;
    }

    public String getG_specifications() {
        return g_specifications;
    }

    public void setG_specifications(String g_specifications) {
        this.g_specifications = g_specifications;
    }

    public String getG_unit() {
        return g_unit;
    }

    public void setG_unit(String g_unit) {
        this.g_unit = g_unit;
    }

    public BigDecimal getG_price() {
        return g_price;
    }

    public void setG_price(BigDecimal g_price) {
        this.g_price = g_price;
    }

    public String getG_type() {
        return g_type;
    }

    public void setG_type(String g_type) {
        this.g_type = g_type;
    }

    public String getG_explain() {
        return g_explain;
    }

    public void setG_explain(String g_explain) {
        this.g_explain = g_explain;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Goods goods = (Goods) o;
        return Objects.equals(g_id, goods.g_id) &&
                Objects.equals(g_cid, goods.g_cid) &&
                Objects.equals(g_name, goods.g_name) &&
                Objects.equals(g_production, goods.g_production) &&
                Objects.equals(g_size, goods.g_size) &&
                Objects.equals(g_csize, goods.g_csize) &&
                Objects.equals(g_psize, goods.g_psize) &&
                Objects.equals(g_specifications, goods.g_specifications) &&
                Objects.equals(g_unit, goods.g_unit) &&
                Objects.equals(g_price, goods.g_price) &&
                Objects.equals(g_type, goods.g_type) &&
                Objects.equals(g_explain, goods.g_explain);
    }

    @Override
    public int hashCode() {
        return Objects.hash(g_id, g_cid, g_name, g_production, g_size, g_csize, g_psize, g_specifications, g_unit, g_price, g_type, g_explain);
    }

    @Override
    public String toString() {
        return "Goods{" +
                "g_id='" + g_id + '\'' +
                ", g_cid='" + g_cid + '\'' +
                ", g_name='" + g_name + '\'' +
                ", g_production='" + g_production + '\'' +
                ", g_size='" + g_size + '\'' +
                ", g_csize='" + g_csize + '\'' +
                ", g_psize='" + g_psize + '\'' +
                ", g_specifications='" + g_specifications + '\'' +
                ", g_unit='" + g_unit + '\'' +
                ", g_price=" + g_price +
                ", g_type='" + g_type + '\'' +
                ", g_explain='" + g_explain + '\'' +
                '}';
    }
}
