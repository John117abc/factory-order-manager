-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2021-03-09 22:36:45
-- 服务器版本： 5.6.50-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xjzbfs`
--

-- --------------------------------------------------------

--
-- 表的结构 `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `c_id` varchar(36) NOT NULL DEFAULT '' COMMENT '客户id',
  `c_region` varchar(128) DEFAULT NULL COMMENT '客户地区',
  `c_company` varchar(128) DEFAULT NULL COMMENT '客户名称',
  `c_name` varchar(64) DEFAULT NULL COMMENT '客户姓名',
  `c_phone` char(11) DEFAULT NULL COMMENT '客户电话'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户表';

--
-- 转存表中的数据 `customer`
--

INSERT INTO `customer` (`c_id`, `c_region`, `c_company`, `c_name`, `c_phone`) VALUES
('4edde192-b511-48fb-b5bf-65c2801c127a', '华新服饰', '昌吉第一人民医院', '牛魔王', '15555552222'),
('d33424da-0703-456a-b001-e77c6b83acf3', '华盛众邦', '乌鲁木齐第一人民医院', '张飞', '15500903275');

-- --------------------------------------------------------

--
-- 表的结构 `customer_address`
--

CREATE TABLE IF NOT EXISTS `customer_address` (
  `a_id` varchar(36) NOT NULL DEFAULT '' COMMENT '地址唯一识别id',
  `a_cid` varchar(36) DEFAULT NULL COMMENT '客户唯一识别id',
  `a_name` varchar(32) DEFAULT NULL COMMENT '收货人姓名',
  `a_phone` char(11) DEFAULT NULL COMMENT '收货人电话',
  `a_address` text COMMENT '收货人地址',
  `a_count` int(10) DEFAULT '0' COMMENT '地址使用次数',
  `a_date` varchar(13) DEFAULT NULL COMMENT '上一次此地址使用时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户地址表';

--
-- 转存表中的数据 `customer_address`
--

INSERT INTO `customer_address` (`a_id`, `a_cid`, `a_name`, `a_phone`, `a_address`, `a_count`, `a_date`) VALUES
('10a68d11-f4ed-46c2-8197-9c1fa72c91c9', '4edde192-b511-48fb-b5bf-65c2801c127a', '唐僧', '15522220000', '海南省三亚市吉阳区育才路一号', 0, '1615108659456'),
('f1cce62b-992c-4af5-ae5d-e2aaba3e3fd2', 'd33424da-0703-456a-b001-e77c6b83acf3', '刘备', '18866223384', '海南省三亚市吉阳区育才路一号', 0, '1613962867589');

-- --------------------------------------------------------

--
-- 表的结构 `customer_consignment`
--

CREATE TABLE IF NOT EXISTS `customer_consignment` (
  `co_id` varchar(36) NOT NULL DEFAULT '' COMMENT '客户托运唯一识别id',
  `co_cid` varchar(36) DEFAULT NULL COMMENT '客户唯一识别id',
  `co_department` text COMMENT '客户托运部',
  `co_count` int(10) DEFAULT '0' COMMENT '托运部使用次数',
  `co_date` varchar(13) DEFAULT NULL COMMENT '上次托运部使用时间',
  `co_phone` varchar(11) DEFAULT NULL COMMENT '托运部联系电话',
  `co_name` varchar(16) DEFAULT NULL COMMENT '托运部联系人'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户托运部表';

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE IF NOT EXISTS `goods` (
  `g_id` varchar(36) NOT NULL DEFAULT '' COMMENT '物品id',
  `g_cid` varchar(36) DEFAULT NULL COMMENT '客户id',
  `g_name` varchar(128) DEFAULT NULL COMMENT '物品名称',
  `g_production` text COMMENT '制作工艺',
  `g_size` varchar(32) DEFAULT NULL COMMENT '尺码',
  `g_csize` varchar(16) DEFAULT NULL COMMENT '衣服尺码',
  `g_psize` varchar(16) DEFAULT NULL COMMENT '裤子尺码',
  `g_specifications` text COMMENT '产品规格',
  `g_unit` varchar(16) DEFAULT NULL COMMENT '尺码',
  `g_price` decimal(9,2) DEFAULT '0.00' COMMENT '单价',
  `g_type` varchar(16) DEFAULT NULL COMMENT '产品类型',
  `g_explain` varchar(36) DEFAULT NULL COMMENT '货号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物品表';

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`g_id`, `g_cid`, `g_name`, `g_production`, `g_size`, `g_csize`, `g_psize`, `g_specifications`, `g_unit`, `g_price`, `g_type`, `g_explain`) VALUES
('0eceb31d-f800-4f1d-9c8f-d6f3893aaa06', '4edde192-b511-48fb-b5bf-65c2801c127a', '护士衣服', '行为倾向我没看错你去看了', '30*30', 'xl', '', '40*40', '件', '34.20', '1', 'hsyf001'),
('2e2436e7-2134-4226-9f00-157a9eee8345', 'd33424da-0703-456a-b001-e77c6b83acf3', '蓝色布料', '1、络筒工序的任务。\r\n\r\n2、将大的筒子纱。\r\n\r\n3、检查 纱线。清除纱线疵点 。\r\n\r\n4、使纱线 在一定张力下卷绕成均匀坚实的筒子，以便整经时经纱张力一致 。\r\n\r\n5、整经 工序的任务：按工艺设计要求将一定根数的经纱按规定长度平行的、均匀的卷绕到经轴上 。\r\n\r\n6、浆纱 工序的任务：提高布料经纱 的可织性，提高纱线强力，减少断头。\r\n\r\n7、穿筘工 序的任务：将织轴上卷绕的 经纱根据工艺设计要求，将经纱穿入综眼，钢筘，以满足织造工序需要。\r\n\r\n8、布料织布工序的织造过程包括：开口、引纬、打纬、', '30*30厘米', '', '', '件', '尺', '66.66', '0', 'lsbl001'),
('54711382-188e-4070-a432-1a67645a1b7a', '4edde192-b511-48fb-b5bf-65c2801c127a', '黑色布料', '我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·我去打网球·', '40*40', '', '', '50*50', '片', '12.30', '0', 'hsbl001'),
('9d1573e0-6649-452b-91f4-e49ce06b06f2', NULL, '柠檬味雪碧', '', '', '', '', '', '', '88.88', '2', 'xb001'),
('f5b49896-1835-489e-a34e-4171926fa442', '4edde192-b511-48fb-b5bf-65c2801c127a', '红色布料', '到五千多年前你进去到五千多年前你进去到五千多年前你进去到五千多年前你进去', '30*30', '40*40', '50*50', '60*60', '片', '67.30', '0', 'hsbl001');

-- --------------------------------------------------------

--
-- 表的结构 `goods_order`
--

CREATE TABLE IF NOT EXISTS `goods_order` (
  `o_id` varchar(36) NOT NULL DEFAULT '' COMMENT '订单id',
  `o_date` varchar(13) DEFAULT NULL COMMENT '下单时间',
  `o_code` varchar(64) DEFAULT NULL COMMENT '订单编码',
  `o_cid` varchar(36) DEFAULT NULL COMMENT '客户id',
  `o_ptype` int(4) DEFAULT NULL COMMENT '订单生产类型0敷料1服饰2其它',
  `o_otype` int(4) DEFAULT NULL COMMENT '订单类型0制作1外购',
  `o_estimate` varchar(13) DEFAULT NULL COMMENT '预计完成时间',
  `o_deadline` varchar(13) DEFAULT NULL COMMENT '截止日期',
  `o_pay_type` int(4) DEFAULT NULL COMMENT '付款类型0对公1对私',
  `o_print_count` int(4) DEFAULT '0' COMMENT '订单打印次数',
  `o_status` int(4) NOT NULL DEFAULT '0' COMMENT '订单状态0正常1异常',
  `o_review` int(4) NOT NULL DEFAULT '0' COMMENT '审核状态1制表完成2制作完成3审核完成4入库完成',
  `o_count` int(10) DEFAULT NULL COMMENT '订单数量',
  `o_price` decimal(9,2) DEFAULT '0.00' COMMENT '订单金额',
  `o_deliver` int(4) NOT NULL DEFAULT '0' COMMENT '发货状态0未发货1发货',
  `o_isinvoice` int(4) DEFAULT NULL COMMENT '是否开具发票0开1不开',
  `o_invoice` varchar(64) DEFAULT NULL COMMENT '发票号',
  `o_wid` varchar(36) DEFAULT NULL COMMENT '生产车间号',
  `o_muid` varchar(36) DEFAULT NULL COMMENT '制单人id',
  `o_auid` varchar(36) DEFAULT NULL COMMENT '后整理人id',
  `o_aeid` varchar(36) DEFAULT NULL COMMENT '结算人',
  `o_mname` varchar(32) DEFAULT NULL COMMENT '制单人姓名',
  `o_wname` varchar(32) DEFAULT NULL COMMENT '生产负责人姓名',
  `o_auname` varchar(32) DEFAULT NULL COMMENT '后整理人姓名',
  `o_aename` varchar(32) DEFAULT NULL COMMENT '结算人姓名',
  `o_mtime` varchar(13) DEFAULT NULL COMMENT '制作订单完成时间',
  `o_aetime` varchar(13) DEFAULT NULL COMMENT '结算完成时间',
  `o_autime` varchar(13) DEFAULT NULL COMMENT '后整理完成时间',
  `o_address` varchar(256) DEFAULT NULL COMMENT '订单地址',
  `o_wtime` varchar(13) DEFAULT NULL COMMENT '生产订单时间',
  `o_wftime` varchar(13) DEFAULT NULL COMMENT '订单生产完成时间',
  `o_courier` varchar(20) DEFAULT NULL COMMENT '送货人姓名',
  `o_oid` varchar(36) DEFAULT NULL COMMENT '出库人id',
  `o_oname` varchar(20) DEFAULT NULL COMMENT '出库人姓名',
  `o_otime` varchar(13) DEFAULT NULL COMMENT '出库表制作时间',
  `o_remarks` varchar(255) DEFAULT NULL COMMENT '订单备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';

--
-- 转存表中的数据 `goods_order`
--

INSERT INTO `goods_order` (`o_id`, `o_date`, `o_code`, `o_cid`, `o_ptype`, `o_otype`, `o_estimate`, `o_deadline`, `o_pay_type`, `o_print_count`, `o_status`, `o_review`, `o_count`, `o_price`, `o_deliver`, `o_isinvoice`, `o_invoice`, `o_wid`, `o_muid`, `o_auid`, `o_aeid`, `o_mname`, `o_wname`, `o_auname`, `o_aename`, `o_mtime`, `o_aetime`, `o_autime`, `o_address`, `o_wtime`, `o_wftime`, `o_courier`, `o_oid`, `o_oname`, `o_otime`, `o_remarks`) VALUES
('2e216920-95e3-42ba-90fd-78d8c0cbc9fa', '1615334400000', '202103102e2169204edde192', '4edde192-b511-48fb-b5bf-65c2801c127a', 1, 0, NULL, '1616112000000', 0, 0, 0, 1, 200, '32.21', 0, 0, NULL, 'a62f4791-728d-46e4-ba9b-2b3d62e38e2f', '8aa69729-e4f0-4797-a3c1-4ea6eb94fc05', NULL, NULL, '李云龙', NULL, NULL, NULL, '1615298838060', NULL, NULL, '10a68d11-f4ed-46c2-8197-9c1fa72c91c9', NULL, NULL, NULL, NULL, NULL, NULL, '你曾经我去参加青年'),
('494cc7d5-691b-46d7-a1c7-bbf73edcb70c', '1614643200000', '20210302494cc7d54edde192', '4edde192-b511-48fb-b5bf-65c2801c127a', 0, 0, '1616061840000', '1617148800000', 0, 0, 0, 4, 300, '980.22', 0, 0, NULL, 'a62f4791-728d-46e4-ba9b-2b3d62e38e2f', 'bf38cf2a-7a22-4e9d-890b-bb193e1eee17', 'bf38cf2a-7a22-4e9d-890b-bb193e1eee17', NULL, '牛魔王', '红孩儿', '牛爷爷', NULL, '1615284224613', NULL, '1615284275956', '10a68d11-f4ed-46c2-8197-9c1fa72c91c9', '1615284253512', '1615284257834', NULL, NULL, NULL, NULL, '武器和杜完全'),
('a7b06118-1563-4035-b08d-f01fb0003e3a', '1615334400000', '20210310a7b061184edde192', '4edde192-b511-48fb-b5bf-65c2801c127a', 1, 0, '1615472100000', '1616198400000', 0, 0, 0, 5, 100, '5678.00', 1, 0, NULL, 'fe6556d4-955c-4ed9-80b5-ffe8708423dd', '8aa69729-e4f0-4797-a3c1-4ea6eb94fc05', '8aa69729-e4f0-4797-a3c1-4ea6eb94fc05', NULL, '李云龙', '太上老君', '坂田太君', NULL, '1615298935943', NULL, '1615299389695', '10a68d11-f4ed-46c2-8197-9c1fa72c91c9', '1615299341881', '1615299345871', '虎子', '8aa69729-e4f0-4797-a3c1-4ea6eb94fc05', '牛牛', '1615299463985', '大器晚成哇');

-- --------------------------------------------------------

--
-- 表的结构 `order_goods`
--

CREATE TABLE IF NOT EXISTS `order_goods` (
  `og_id` varchar(36) NOT NULL COMMENT '订单物品表id',
  `og_oid` varchar(36) NOT NULL COMMENT '订单id',
  `og_gid` varchar(36) NOT NULL COMMENT '物品id',
  `og_count` varchar(10) DEFAULT NULL COMMENT '产品数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每个订单的物品';

--
-- 转存表中的数据 `order_goods`
--

INSERT INTO `order_goods` (`og_id`, `og_oid`, `og_gid`, `og_count`) VALUES
('00dd0088-ee5f-4351-a0f8-604c79fb0e9b', '494cc7d5-691b-46d7-a1c7-bbf73edcb70c', '54711382-188e-4070-a432-1a67645a1b7a', '100'),
('31ffaa15-11c6-4eb4-b4ac-c6ed63a824fb', '494cc7d5-691b-46d7-a1c7-bbf73edcb70c', 'f5b49896-1835-489e-a34e-4171926fa442', '200'),
('72afd80c-db9c-41a0-8b49-9e10b971e405', '2e216920-95e3-42ba-90fd-78d8c0cbc9fa', '0eceb31d-f800-4f1d-9c8f-d6f3893aaa06', '200'),
('e13cc25d-117f-44c9-b620-4dedd3eedfc4', 'a7b06118-1563-4035-b08d-f01fb0003e3a', '0eceb31d-f800-4f1d-9c8f-d6f3893aaa06', '100');

-- --------------------------------------------------------

--
-- 表的结构 `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `user_id` varchar(36) NOT NULL DEFAULT '' COMMENT '用户id',
  `create_time` varchar(13) DEFAULT NULL COMMENT '创建时间',
  `user_type` int(3) DEFAULT NULL COMMENT '用户类型，0管理员1车间',
  `sessionId` varchar(40) DEFAULT NULL COMMENT 'session的id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='session表';

--
-- 转存表中的数据 `session`
--

INSERT INTO `session` (`user_id`, `create_time`, `user_type`, `sessionId`) VALUES
('abf30c87-61fb-11eb-b067-000c29d503b7', NULL, 0, NULL),
('bf38cf2a-7a22-4e9d-890b-bb193e1eee17', '1615299494953', 0, 'ABAD5393F644F9C7D9A7E945D124A6CF');

-- --------------------------------------------------------

--
-- 表的结构 `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `s_id` varchar(36) NOT NULL DEFAULT '' COMMENT '库存唯一识别id',
  `s_oid` varchar(36) DEFAULT NULL COMMENT '订单识别id',
  `s_gid` varchar(36) DEFAULT NULL COMMENT '物品id',
  `s_idate` varchar(13) DEFAULT NULL COMMENT '入库时间',
  `s_odate` varchar(13) DEFAULT NULL COMMENT '出库时间',
  `s_status` int(4) DEFAULT NULL COMMENT '库存状态0在库存，1不在库存'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='库存表';

--
-- 转存表中的数据 `stock`
--

INSERT INTO `stock` (`s_id`, `s_oid`, `s_gid`, `s_idate`, `s_odate`, `s_status`) VALUES
('30241a7c-cdba-46e8-9942-11138a562a3c', '494cc7d5-691b-46d7-a1c7-bbf73edcb70c', '54711382-188e-4070-a432-1a67645a1b7a', '1615284275956', NULL, 0),
('506290de-edbb-4a49-9806-043f0bde2119', 'a7b06118-1563-4035-b08d-f01fb0003e3a', '0eceb31d-f800-4f1d-9c8f-d6f3893aaa06', '1615299389695', '1616457600000', 1),
('77980044-244e-4ad0-9259-2929f7ddfcb9', '494cc7d5-691b-46d7-a1c7-bbf73edcb70c', 'f5b49896-1835-489e-a34e-4171926fa442', '1615284275956', NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `u_id` varchar(36) NOT NULL DEFAULT '' COMMENT '用户唯一识别id',
  `u_name` varchar(36) DEFAULT NULL COMMENT '用户名',
  `u_phone` char(11) DEFAULT NULL COMMENT '用户手机号',
  `u_password` varchar(48) DEFAULT NULL COMMENT '用户密码',
  `u_admin` int(4) NOT NULL DEFAULT '0' COMMENT '用户模式0普通管理员1超级管理员',
  `u_date` varchar(13) DEFAULT NULL COMMENT '用户上次登录时间',
  `u_tname` varchar(32) DEFAULT NULL COMMENT '用户真实姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_phone`, `u_password`, `u_admin`, `u_date`, `u_tname`) VALUES
('016e95ec-aace-46cd-a576-54ebc47fd942', 'j7822892', '15500903275', '511343b0ce57e6f85328703ee65e1355087d26768002d72f', 0, NULL, '姜丞轩'),
('33ab350b-28e3-4a2a-950d-c6626092d211', '李逵', '13325696325', '789456', 0, '2147483647', '施瓦辛格'),
('8aa69729-e4f0-4797-a3c1-4ea6eb94fc05', 'j123456', '15500903270', '14af4c814177608c26f89730d76b4300a99198b64ea09e11', 0, '1615299273787', '姜丞轩'),
('bf38cf2a-7a22-4e9d-890b-bb193e1eee17', 'j1234567', '15500903272', 'e7089c25362ed38207a72c9ed6523cd2bd00076e1e465e0c', 1, '1615299494953', '姜丞轩');

-- --------------------------------------------------------

--
-- 表的结构 `user_make`
--

CREATE TABLE IF NOT EXISTS `user_make` (
  `m_id` varchar(36) NOT NULL DEFAULT '' COMMENT '签单日期表唯一识别id',
  `m_uid` varchar(36) DEFAULT NULL COMMENT '管理员唯一识别id',
  `m_oid` varchar(36) DEFAULT NULL COMMENT '订单唯一识别id',
  `m_date` varchar(13) DEFAULT NULL COMMENT '签单日期',
  `m_type` int(4) DEFAULT NULL COMMENT '用户类型0制单1制作2审核'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user_make';

-- --------------------------------------------------------

--
-- 表的结构 `workshop`
--

CREATE TABLE IF NOT EXISTS `workshop` (
  `w_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车间识别id',
  `w_type` int(4) DEFAULT NULL COMMENT '车间类型0裁剪室1敷料室',
  `w_account` varchar(16) DEFAULT NULL COMMENT '车间账号',
  `w_password` varchar(48) DEFAULT NULL COMMENT '车间账号密码',
  `w_lastdate` varchar(13) DEFAULT NULL COMMENT '车间账号上次登陆时间',
  `w_count` int(10) DEFAULT NULL COMMENT '车间接单数',
  `w_online` int(4) NOT NULL DEFAULT '1' COMMENT '车间是否在线0在线1不在线',
  `w_name` varchar(32) DEFAULT NULL COMMENT '车间名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='生产车间表';

--
-- 转存表中的数据 `workshop`
--

INSERT INTO `workshop` (`w_id`, `w_type`, `w_account`, `w_password`, `w_lastdate`, `w_count`, `w_online`, `w_name`) VALUES
('a62f4791-728d-46e4-ba9b-2b3d62e38e2f', 0, 'a123456', '01aa80745c25c18e6894432523635bc28f6b628f71c3b424', NULL, 0, 1, '裁剪室1'),
('fe6556d4-955c-4ed9-80b5-ffe8708423dd', 0, 'f123456', '64713540db4844ab77b5d327035e90675c4166eb04a3611d', NULL, 1, 1, '敷料室1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `a_cid` (`a_cid`);

--
-- Indexes for table `customer_consignment`
--
ALTER TABLE `customer_consignment`
  ADD PRIMARY KEY (`co_id`),
  ADD KEY `co_cid` (`co_cid`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`g_id`),
  ADD KEY `g_cid` (`g_cid`);

--
-- Indexes for table `goods_order`
--
ALTER TABLE `goods_order`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `o_cid` (`o_cid`),
  ADD KEY `o_cid_2` (`o_cid`),
  ADD KEY `o_wid` (`o_wid`),
  ADD KEY `o_muid` (`o_muid`),
  ADD KEY `o_auid` (`o_auid`),
  ADD KEY `o_aeid` (`o_aeid`);

--
-- Indexes for table `order_goods`
--
ALTER TABLE `order_goods`
  ADD PRIMARY KEY (`og_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `s_oid` (`s_oid`),
  ADD KEY `s_oid_2` (`s_oid`),
  ADD KEY `s_gid` (`s_gid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `user_make`
--
ALTER TABLE `user_make`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `m_uid` (`m_uid`),
  ADD KEY `m_uid_2` (`m_uid`),
  ADD KEY `m_oid` (`m_oid`),
  ADD KEY `m_uid_3` (`m_uid`),
  ADD KEY `m_oid_2` (`m_oid`);

--
-- Indexes for table `workshop`
--
ALTER TABLE `workshop`
  ADD PRIMARY KEY (`w_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
