package com.xjzbfs.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMake {

    private String m_id;
    private String m_uid;
    private String m_oid;
    private String m_date;
    private Integer m_type;

    public String getM_id() {
        return m_id;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }

    public String getM_uid() {
        return m_uid;
    }

    public void setM_uid(String m_uid) {
        this.m_uid = m_uid;
    }

    public String getM_oid() {
        return m_oid;
    }

    public void setM_oid(String m_oid) {
        this.m_oid = m_oid;
    }

    public String getM_date() {
        return m_date;
    }

    public void setM_date(String m_date) {
        this.m_date = m_date;
    }

    public Integer getM_type() {
        return m_type;
    }

    public void setM_type(Integer m_type) {
        this.m_type = m_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserMake userMake = (UserMake) o;
        return m_id.equals(userMake.m_id) &&
                m_uid.equals(userMake.m_uid) &&
                m_oid.equals(userMake.m_oid) &&
                m_date.equals(userMake.m_date) &&
                m_type.equals(userMake.m_type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(m_id, m_uid, m_oid, m_date, m_type);
    }

    @Override
    public String toString() {
        return "UserMake{" +
                "m_id='" + m_id + '\'' +
                ", m_uid='" + m_uid + '\'' +
                ", m_oid='" + m_oid + '\'' +
                ", m_date=" + m_date +
                ", m_type=" + m_type +
                '}';
    }
}
