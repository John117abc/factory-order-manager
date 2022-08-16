package com.xjzbfs.tools;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class DataMethod {

    public static int getAgeByBirth(String birth) {
        Date birthDay = null;
        int age = 0;
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        try {
            birthDay=simpleDateFormat.parse(birth);
        } catch(ParseException px) {
            px.printStackTrace();
            return -1;
        }
        Calendar cal = Calendar.getInstance();
        if (cal.before(birthDay)) { //出生日期晚于当前时间，无法计算
            throw new IllegalArgumentException(
                    "The birthDay is before Now.It's unbelievable!");
        }
        int yearNow = cal.get(Calendar.YEAR);  //当前年份
        int monthNow = cal.get(Calendar.MONTH);  //当前月份
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH); //当前日期
        cal.setTime(birthDay);
        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);
        age = yearNow - yearBirth;   //计算整岁数
        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth) age--;//当前日期在生日之前，年龄减一
            } else {
                age--;//当前月份在生日之前，年龄减一
            }
        }
        return age;
    }

    /**
     * 5.   国际电话号码验证
     以数字或+开头
     后面的必须是数字长度在 12 到 13

     */
    public static boolean checkTel(String tel) {
        String regex="[+\\d]?\\d{12,13}";
        return tel.matches(regex);
    }

    /**
     * 4.   注册电子邮箱验证
     邮箱地址必须包含@字符
     邮箱@的左边必须以字母, 下划线, 数字开头, 且必须有一个
     邮箱@的左边除了开头字母其他的可以是字母, 下划线, 数字， 点号 . 小杠 -
     邮箱@的右边必须有 . 点号
     在 @ 和 . 之间必须以字母, 下划线, 数字开头, 且除了开头字母其他的可以是字母, 下划线, 数字， 点号 . 小杠 -
     在 . 点号后面至少有一个 字母, 下划线, 数字开头
     */
    public static boolean checkEmail(String email) {
        String regex="(\\w+)([\\w+.-])*@(\\w+)([\\w+.-])*\\.\\w+";
        return email.matches(regex);
    }

    /**
     * 身份证验证
     身份证号码必须为15位或18位数字
     */
    public static boolean checkIdentity(String identity) {
        String regex="\\d{15}|\\d{18}|\\d{17}X";
        return identity.matches(regex);
    }

    /**
     * 2.   论坛注册用户名验证
     必须以字母开头
     只能包括 字母 , 下划线 , 数字
     长度必须在6 到 16 之间

     */
    public static boolean checkUsername(String username) {
        //String regex="[a-zA-Z][0-9a-zA-Z_]{5,9}";
        //String regex="[a-zA-Z][\\da-zA-Z_]{5,9}";// \d  要转成 \\d
        String regex="[a-zA-Z]\\w{5,17}";
        return username.matches(regex);
    }

    /**
     * 1.   验证码必须是数字, 并且是4位数字
     * @param
     */
    public static boolean checkValidCode(String code) {
        //String regex="[0-9][0-9][0-9][0-9]";
        String regex="[0-9]{4}";
        return code.matches(regex);
    }

    public static void checkTelephone2(String telephone) {
        String regex="1[0-9]{10}";
        boolean b=telephone.matches(regex);
        if(b)
        {
            System.out.println("有效电话号码");
        }
        else
        {
            System.out.println("无效电话号码");
        }
    }
    /**
     * 题目: 注册的时候, 验证输入手机号码的有效性
     要求:
     必须是1开头的
     长度为11位
     手机号码必须是数字

     * @param
     */
    public static boolean checkTelephone(String telephone) {
        //是否是1开头的
        if(!telephone.startsWith("1"))
        {
            return false;
        }else if(telephone.length()!=11)//判断电话号码是否 11 位
        {
            return false;
        }else
        {
            //手机号码是否为数字
            String num="0123456789";
            char[] chars=telephone.toCharArray();
            boolean isValid=true;
            for(int i=0;i<chars.length;i++)
            {
                String s=String.valueOf(chars[i]);
                if(num.indexOf(s)<0)
                {
                    isValid=false;
                }
            }
            if(isValid)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }



    /**
     *  Description:密码验证要大于6小于16位
     *  @author Azure.
     *  @DateTime 2019年4月12日 下午8:38:11
     *  @param pwd
     *  @return
     */
    public static boolean checkPassword(String pwd) {
        if(pwd.length()<6||pwd.length()>16) {
            return false;
        }else {
            return true;
        }
    }

    /**
     * 题目: 注册的时候, 验证输入姓名
     * @param
     */
    public static boolean checkName(String name) {
        String regEx = "[\u4e00-\u9fa5]";
        Pattern pat = Pattern.compile(regEx);
        Matcher matcher = pat.matcher(name);
        boolean flg = false;
        if (matcher.find()&&name.length()<12)
            flg = true;
        return flg;
    }

    /**
     * 判断字符串是否是字母数字和汉字
     * @param str
     * @return
     */
    public static boolean checkSZH(String str,int n) {
        String regEx = "[a-zA-Z\0-9\u4e00-\u9fa5]";
        Pattern pat = Pattern.compile(regEx);
        Matcher matcher = pat.matcher(str);
        boolean flg = false;
        if(matcher.find()&&str.length()<n&&str.length()>0)
            flg = true;
        return flg;
    }

    /**
     * 判断字符串是否是字母数字和汉字
     * @param str
     * @return
     */
    public static boolean checkChinese(String str,int n) {
        String regEx = "[\u4e00-\u9fa5]";
        Pattern pat = Pattern.compile(regEx);
        Matcher matcher = pat.matcher(str);
        boolean flg = false;
        if(matcher.find()&&str.length()<n)
            flg = true;
        return flg;
    }

    /**
     * 判断传入id是否合法
     * @param str
     * @return
     */
    public static boolean checkIds(String str) {
        String regEx = "[a-zA-Z\0-9\\-]";
        Pattern pat = Pattern.compile(regEx);
        Matcher matcher = pat.matcher(str);
        boolean flg = false;
        if(matcher.find()&&str.length()<37)
            flg = true;
        return flg;
    }

    public static boolean checkSex(String sex) {
        if(sex.equals("男")||sex.equals("女"))
            return true;
        else
            return false;
    }

    public static boolean isInteger(String str) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        return pattern.matcher(str).matches();
    }

    public static Date timeToDate(Timestamp timestamp) {
        // Timestamp -> String
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(timestamp);

        // String -> Date
        Date date = new Date();
        //注意format的格式要与日期String的格式相匹配
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            date = sdf.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static int nDaysBetweenTwoDate(String firstString, String secondString) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date firstDate = null;
        Date secondDate = null;
        try {
            firstDate = df.parse(firstString);
            secondDate = df.parse(secondString);
        } catch (Exception e) {
            // 日期型字符串格式错误
            System.out.println("日期型字符串格式错误");
        }
        int nDay = (int) ((secondDate.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000));
        return nDay;
    }

    //生成普通的MD5码
    public static String MD5(String input) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            return "check jdk";
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        char[] charArray = input.toCharArray();
        byte[] byteArray = new byte[charArray.length];
        for (int i = 0; i < charArray.length; i++)
            byteArray[i] = (byte) charArray[i];
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16)
                hexValue.append("0");
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }

    //生成“盐”和加盐后的MD5码，并将盐混入到MD5码中
    public static String generate(String password) {
        //生成一个16位的随机数，也就是所谓的“盐”
        Random r = new Random();
        StringBuilder sb = new StringBuilder(16);
        sb.append(r.nextInt(99999999)).append(r.nextInt(99999999));
        int len = sb.length();
        if (len < 16) {
            for (int i = 0; i < 16 - len; i++) {
                sb.append("0");
            }
        }
        String salt = sb.toString();
        //将“盐”加到明文中，并生成新的MD5码
        password = md5Hex(password + salt);
        //将“盐”混到新生成的MD5码中，之所以这样做是为了后期更方便的校验明文和秘文，也可以不用这么做，不过要将“盐”单独存下来，不推荐这种方式
        char[] cs = new char[48];
        for (int i = 0; i < 48; i += 3) {
            cs[i] = password.charAt(i / 3 * 2);
            char c = salt.charAt(i / 3);
            cs[i + 1] = c;
            cs[i + 2] = password.charAt(i / 3 * 2 + 1);
        }
        return new String(cs);
    }

    //验证明文和加盐后的MD5码是否匹配
    public static boolean verify(String password, String md5) {
        //先从MD5码中取出之前加的“盐”和加“盐”后生成的MD5码
        char[] cs1 = new char[32];
        char[] cs2 = new char[16];
        for (int i = 0; i < 48; i += 3) {
            cs1[i / 3 * 2] = md5.charAt(i);
            cs1[i / 3 * 2 + 1] = md5.charAt(i + 2);
            cs2[i / 3] = md5.charAt(i + 1);
        }
        String salt = new String(cs2);
        //比较二者是否相同
        return md5Hex(password + salt).equals(new String(cs1));
    }

    //生成MD5
    private static String md5Hex(String src) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] bs = md5.digest(src.getBytes());
            return new String(hexEncode(bs));
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 字节流转成十六进制表示
     */
    public static String hexEncode(byte[] src) {
        String strHex;
        StringBuilder sb = new StringBuilder();
        for (int n = 0; n < src.length; n++) {
            strHex = Integer.toHexString(src[n] & 0xFF);
            sb.append((strHex.length() == 1) ? "0" + strHex : strHex); // 每个字节由两个字符表示，位数不够，高位补0
        }
        return sb.toString().trim();
    }

    /**
     * 判断是否可转化为数字
     *
     * @param str
     * @return
     */
    public static boolean isNumeric(String str) {
        Pattern pattern = Pattern.compile("^(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
        Matcher isNum = pattern.matcher(str);
        return isNum.matches();
    }

    /**
     *  生成订单编码
     * @param time  时间戳
     * @param c_id  客户id
     * @param o_id  订单id
     * @return 订单编码
     */
    public static String toOrderCode(String time,String c_id,String o_id) {

        Long timeStamp = Long.parseLong(time);
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
        String code = sdf.format(new Date(Long.parseLong(String.valueOf(timeStamp))));

        code +=  c_id.substring(0,c_id.indexOf('-'))+o_id.substring(0,o_id.indexOf('-'));

        return code;

    }


    /*
     * 将时间戳转换为时间
     */
    public static String stampToDate(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }


    public static boolean checkMoney(String str) {
        java.util.regex.Pattern pattern=java.util.regex.Pattern.compile("(^[1-9]([0-9]+)?(\\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\\.[0-9]([0-9])?$)"); // 判断小数点后2位的数字的正则表达式        java.util.regex.Matcher match=pattern.matcher(str);
        java.util.regex.Matcher match=pattern.matcher(str);
        if(match.matches()==false) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 获取一个月的开始和结束时间戳
     * @param month
     * @return
     */
    public static Map<String,String> toEndAndStartMonth(String month){
        month+="-01";
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
        //日期转时间戳（毫秒）
        Map<String, String> map = new HashMap<String, String>();
        try {
            Date date = format.parse(month);
            //日期转时间戳（毫秒）
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MONTH, 0);
            Date theDate = calendar.getTime();

            //这个月第一天
            GregorianCalendar gcLast = (GregorianCalendar) Calendar.getInstance();
            gcLast.setTime(theDate);
            gcLast.set(Calendar.DAY_OF_MONTH, 1);
            String day_first = df.format(gcLast.getTime());
            StringBuffer str = new StringBuffer().append(day_first).append(" 00:00:00");
            day_first = str.toString();

            //这个月最后一天
            calendar.add(Calendar.MONTH, 1);    //加一个月
            calendar.set(Calendar.DATE, 1);        //设置为该月第一天
            calendar.add(Calendar.DATE, -1);    //再减一天即为上个月最后一天
            String day_last = df.format(calendar.getTime());
            StringBuffer endStr = new StringBuffer().append(day_last).append(" 23:59:59");
            day_last = endStr.toString();
            SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            map.put("Start",Long.toString(f.parse(day_first).getTime()));
            map.put("End",Long.toString(f.parse(day_last).getTime()));
            return map;
        }catch (ParseException e){
            e.printStackTrace();
        }finally {
            return map;
        }
    }

    /**
     * 获取当前月份开始结束时间戳
     * @return
     */
    public static Map<String,String> getNowMonthEndAndStart() {
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
        String time = format.format(new Date());
        Map<String, String> map = new HashMap<String, String>();
        try {
            Date date = format.parse(time);
            //日期转时间戳（毫秒）
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MONTH, 0);
            Date theDate = calendar.getTime();

            //上个月第一天
            GregorianCalendar gcLast = (GregorianCalendar) Calendar.getInstance();
            gcLast.setTime(theDate);
            gcLast.set(Calendar.DAY_OF_MONTH, 1);
            String day_first = df.format(gcLast.getTime());
            StringBuffer str = new StringBuffer().append(day_first).append(" 00:00:00");
            day_first = str.toString();

            //上个月最后一天
            calendar.add(Calendar.MONTH, 1);    //加一个月
            calendar.set(Calendar.DATE, 1);        //设置为该月第一天
            calendar.add(Calendar.DATE, -1);    //再减一天即为上个月最后一天
            String day_last = df.format(calendar.getTime());
            StringBuffer endStr = new StringBuffer().append(day_last).append(" 23:59:59");
            day_last = endStr.toString();
            SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            map.put("Start",Long.toString(f.parse(day_first).getTime()));
            map.put("End",Long.toString(f.parse(day_last).getTime()));
            return map;
        }catch (ParseException e){
            e.printStackTrace();
        }finally {
            return map;
        }
    }

}
