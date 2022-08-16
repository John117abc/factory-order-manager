package com.xjzbfs.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoodsOrder {

    private String o_id;
    private String o_date;
    private String o_code;
    private String o_cid;
    private String o_gid;
    private Integer o_ptype;
    private Integer o_otype;
    private String o_estimate;
    private String o_deadline;
    private Integer o_pay_type;
    private Integer o_print_count;
    private Integer o_status;
    private Integer o_review;
    private Integer o_count;
    private BigDecimal o_price;
    private Integer o_deliver;
    private Integer o_isinvoice;
    private String o_invoice;
    private String o_wid;
    private String o_muid;
    private String o_auid;
    private String o_aeid;
    private String o_mname;
    private String o_wname;
    private String o_auname;
    private String o_aename;
    private String o_mtime;
    private String o_wtime;
    private String o_aetime;
    private String o_autime;
    private String o_address;
    private String o_wftime;
    private String o_courier;
    private String o_oid;
    private String o_oname;
    private String o_otime;
    private String o_remarks;

    public String getO_oid() {
        return o_oid;
    }

    public void setO_oid(String o_oid) {
        this.o_oid = o_oid;
    }

    public String getO_oname() {
        return o_oname;
    }

    public void setO_oname(String o_oname) {
        this.o_oname = o_oname;
    }

    public String getO_otime() {
        return o_otime;
    }

    public void setO_otime(String o_otime) {
        this.o_otime = o_otime;
    }

    public String getO_courier() {
        return o_courier;
    }

    public void setO_courier(String o_courier) {
        this.o_courier = o_courier;
    }

    public String getO_wftime() {
        return o_wftime;
    }

    public void setO_wftime(String o_wftime) {
        this.o_wftime = o_wftime;
    }

    public String getO_gid() {
        return o_gid;
    }

    public void setO_gid(String o_gid) {
        this.o_gid = o_gid;
    }

    public String getO_wtime() {
        return o_wtime;
    }

    public void setO_wtime(String o_wtime) {
        this.o_wtime = o_wtime;
    }

    public String getO_address() {
        return o_address;
    }

    public void setO_address(String o_address) {
        this.o_address = o_address;
    }

    public String getO_mtime() {
        return o_mtime;
    }

    public void setO_mtime(String o_mtime) {
        this.o_mtime = o_mtime;
    }

    public String getO_aetime() {
        return o_aetime;
    }

    public void setO_aetime(String o_aetime) {
        this.o_aetime = o_aetime;
    }

    public String getO_autime() {
        return o_autime;
    }

    public void setO_autime(String o_autime) {
        this.o_autime = o_autime;
    }

    public String getO_id() {
        return o_id;
    }

    public void setO_id(String o_id) {
        this.o_id = o_id;
    }

    public String getO_date() {
        return o_date;
    }

    public void setO_date(String o_date) {
        this.o_date = o_date;
    }

    public String getO_code() {
        return o_code;
    }

    public void setO_code(String o_code) {
        this.o_code = o_code;
    }

    public String getO_cid() {
        return o_cid;
    }

    public void setO_cid(String o_cid) {
        this.o_cid = o_cid;
    }

    public Integer getO_ptype() {
        return o_ptype;
    }

    public void setO_ptype(Integer o_ptype) {
        this.o_ptype = o_ptype;
    }

    public Integer getO_otype() {
        return o_otype;
    }

    public void setO_otype(Integer o_otype) {
        this.o_otype = o_otype;
    }

    public String getO_estimate() {
        return o_estimate;
    }

    public void setO_estimate(String o_estimate) {
        this.o_estimate = o_estimate;
    }

    public String getO_deadline() {
        return o_deadline;
    }

    public void setO_deadline(String o_deadline) {
        this.o_deadline = o_deadline;
    }

    public Integer getO_pay_type() {
        return o_pay_type;
    }

    public void setO_pay_type(Integer o_pay_type) {
        this.o_pay_type = o_pay_type;
    }

    public Integer getO_print_count() {
        return o_print_count;
    }

    public void setO_print_count(Integer o_print_count) {
        this.o_print_count = o_print_count;
    }

    public Integer getO_status() {
        return o_status;
    }

    public void setO_status(Integer o_status) {
        this.o_status = o_status;
    }

    public Integer getO_review() {
        return o_review;
    }

    public void setO_review(Integer o_review) {
        this.o_review = o_review;
    }

    public Integer getO_count() {
        return o_count;
    }

    public void setO_count(Integer o_count) {
        this.o_count = o_count;
    }

    public BigDecimal getO_price() {
        return o_price;
    }

    public void setO_price(BigDecimal o_price) {
        this.o_price = o_price;
    }

    public Integer getO_deliver() {
        return o_deliver;
    }

    public void setO_deliver(Integer o_deliver) {
        this.o_deliver = o_deliver;
    }

    public Integer getO_isinvoice() {
        return o_isinvoice;
    }

    public void setO_isinvoice(Integer o_isinvoice) {
        this.o_isinvoice = o_isinvoice;
    }

    public String getO_invoice() {
        return o_invoice;
    }

    public void setO_invoice(String o_invoice) {
        this.o_invoice = o_invoice;
    }

    public String getO_wid() {
        return o_wid;
    }

    public void setO_wid(String o_wid) {
        this.o_wid = o_wid;
    }

    public String getO_muid() {
        return o_muid;
    }

    public void setO_muid(String o_muid) {
        this.o_muid = o_muid;
    }

    public String getO_auid() {
        return o_auid;
    }

    public void setO_auid(String o_auid) {
        this.o_auid = o_auid;
    }

    public String getO_aeid() {
        return o_aeid;
    }

    public void setO_aeid(String o_aeid) {
        this.o_aeid = o_aeid;
    }

    public String getO_mname() {
        return o_mname;
    }

    public void setO_mname(String o_mname) {
        this.o_mname = o_mname;
    }

    public String getO_wname() {
        return o_wname;
    }

    public void setO_wname(String o_wname) {
        this.o_wname = o_wname;
    }

    public String getO_auname() {
        return o_auname;
    }

    public void setO_auname(String o_auname) {
        this.o_auname = o_auname;
    }

    public String getO_aename() {
        return o_aename;
    }

    public void setO_aename(String o_aename) {
        this.o_aename = o_aename;
    }

    public String getO_remarks() {
        return o_remarks;
    }

    public void setO_remarks(String o_remarks) {
        this.o_remarks = o_remarks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GoodsOrder that = (GoodsOrder) o;
        return Objects.equals(o_id, that.o_id) &&
                Objects.equals(o_date, that.o_date) &&
                Objects.equals(o_code, that.o_code) &&
                Objects.equals(o_cid, that.o_cid) &&
                Objects.equals(o_gid, that.o_gid) &&
                Objects.equals(o_ptype, that.o_ptype) &&
                Objects.equals(o_otype, that.o_otype) &&
                Objects.equals(o_estimate, that.o_estimate) &&
                Objects.equals(o_deadline, that.o_deadline) &&
                Objects.equals(o_pay_type, that.o_pay_type) &&
                Objects.equals(o_print_count, that.o_print_count) &&
                Objects.equals(o_status, that.o_status) &&
                Objects.equals(o_review, that.o_review) &&
                Objects.equals(o_count, that.o_count) &&
                Objects.equals(o_price, that.o_price) &&
                Objects.equals(o_deliver, that.o_deliver) &&
                Objects.equals(o_isinvoice, that.o_isinvoice) &&
                Objects.equals(o_invoice, that.o_invoice) &&
                Objects.equals(o_wid, that.o_wid) &&
                Objects.equals(o_muid, that.o_muid) &&
                Objects.equals(o_auid, that.o_auid) &&
                Objects.equals(o_aeid, that.o_aeid) &&
                Objects.equals(o_mname, that.o_mname) &&
                Objects.equals(o_wname, that.o_wname) &&
                Objects.equals(o_auname, that.o_auname) &&
                Objects.equals(o_aename, that.o_aename) &&
                Objects.equals(o_mtime, that.o_mtime) &&
                Objects.equals(o_wtime, that.o_wtime) &&
                Objects.equals(o_aetime, that.o_aetime) &&
                Objects.equals(o_autime, that.o_autime) &&
                Objects.equals(o_address, that.o_address) &&
                Objects.equals(o_wftime, that.o_wftime) &&
                Objects.equals(o_courier, that.o_courier) &&
                Objects.equals(o_oid, that.o_oid) &&
                Objects.equals(o_oname, that.o_oname) &&
                Objects.equals(o_otime, that.o_otime) &&
                Objects.equals(o_remarks, that.o_remarks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(o_id, o_date, o_code, o_cid, o_gid, o_ptype, o_otype, o_estimate, o_deadline, o_pay_type, o_print_count, o_status, o_review, o_count, o_price, o_deliver, o_isinvoice, o_invoice, o_wid, o_muid, o_auid, o_aeid, o_mname, o_wname, o_auname, o_aename, o_mtime, o_wtime, o_aetime, o_autime, o_address, o_wftime, o_courier, o_oid, o_oname, o_otime, o_remarks);
    }

    @Override
    public String toString() {
        return "GoodsOrder{" +
                "o_id='" + o_id + '\'' +
                ", o_date='" + o_date + '\'' +
                ", o_code='" + o_code + '\'' +
                ", o_cid='" + o_cid + '\'' +
                ", o_gid='" + o_gid + '\'' +
                ", o_ptype=" + o_ptype +
                ", o_otype=" + o_otype +
                ", o_estimate='" + o_estimate + '\'' +
                ", o_deadline='" + o_deadline + '\'' +
                ", o_pay_type=" + o_pay_type +
                ", o_print_count=" + o_print_count +
                ", o_status=" + o_status +
                ", o_review=" + o_review +
                ", o_count=" + o_count +
                ", o_price=" + o_price +
                ", o_deliver=" + o_deliver +
                ", o_isinvoice=" + o_isinvoice +
                ", o_invoice='" + o_invoice + '\'' +
                ", o_wid='" + o_wid + '\'' +
                ", o_muid='" + o_muid + '\'' +
                ", o_auid='" + o_auid + '\'' +
                ", o_aeid='" + o_aeid + '\'' +
                ", o_mname='" + o_mname + '\'' +
                ", o_wname='" + o_wname + '\'' +
                ", o_auname='" + o_auname + '\'' +
                ", o_aename='" + o_aename + '\'' +
                ", o_mtime='" + o_mtime + '\'' +
                ", o_wtime='" + o_wtime + '\'' +
                ", o_aetime='" + o_aetime + '\'' +
                ", o_autime='" + o_autime + '\'' +
                ", o_address='" + o_address + '\'' +
                ", o_wftime='" + o_wftime + '\'' +
                ", o_courier='" + o_courier + '\'' +
                ", o_oid='" + o_oid + '\'' +
                ", o_oname='" + o_oname + '\'' +
                ", o_otime='" + o_otime + '\'' +
                ", o_remarks='" + o_remarks + '\'' +
                '}';
    }
}
