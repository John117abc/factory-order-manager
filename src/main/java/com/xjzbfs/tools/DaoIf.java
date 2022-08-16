package com.xjzbfs.tools;

import com.alibaba.fastjson.JSONArray;

import java.util.HashMap;
import java.util.Map;

public final class DaoIf {
    public static String getOptype(String type) {
        if(type.equals("0"))
            return "辅料";
        else if (type.equals("1"))
            return "服饰";
        else if (type.equals("2"))
            return "其它";
        return "错误Optype";
    }


    public static String getOotype(String type) {
        if (type.equals("0"))
            return "制作";
        else if (type.equals("1"))
            return "外购";
        return "错误Ootype";
    }


    public static String getPayType(String type) {
        if (type.equals("0"))
            return "对公";
        else if (type.equals("1"))
            return "对私";

        return "错误PayType";
    }

    public static String getOreview(String type) {
        if (type.equals("1"))
            return "订单制表完成，待制作";
        else if (type.equals("2"))
            return "订单制作中";
        else if (type.equals("3"))
            return "订单制作完成，待审核";
        else if (type.equals("4"))
            return "审核完成已入库";
        else if (type.equals("5"))
            return "订单已出库";
        return  "错误review";
    }

    /**
     * 合并相同id的ordergoods
     * @param oGids
     * @param oCounts
     * @return
     */
    public static Map<String,String> mergeOgIdAndOgCount(String[] oGids, String[] oCounts) {
        Map<String, String> map = new HashMap<>();
        for (int i = 0; i < oGids.length; i++) {
            if(map.containsKey(oGids[i])){
                Long temp = Long.parseLong(map.get(oGids[i]))+Long.parseLong(oCounts[i]);
                map.put(oGids[i],temp.toString());
            } else {
                map.put(oGids[i],oCounts[i]);
            }
        }
        return map;
    }
}
