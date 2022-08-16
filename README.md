工厂订单管理系统
===========================

###########环境依赖
java version "1.8.0_271"

MySQL 5.6.50

springBoot 2.1.4

fastjson 1.2.73

###########部署步骤
1.服务器需要安装mysql 5.6.50和java1.8
2.服务器mysql导入数据库文件xjzbfs.sql数据库为xjzbfs密码为Wfs4H6NKNW4htGHR
3.更改源码中SpringBoot配置文件application.properties中的服务器地址
4.修改源码中static/js/control/common.js的变量urlHeader为自己服务器的ip和端口
5.使用idea生成jar包，上传到服务器在和jar包相同目录建立文件夹nohup.out
6.打开服务器控制台输入nohup java -jar xxx.jar &运行服务
7.访问http://ip地址:端口号/signin 登录管理端.http://ip地址:端口号/workshop/login 

###########目录结构描述
│   tree.txt
│   
├───java
│   ├───com
│   │   └───xjzbfs
│   │       │   App.java		//启动入口
│   │       │   
│   │       ├───config		//配置、过滤器、拦截器
│   │       │       BasicFilter.java		//过滤器，使数据流转化为utf8编码
│   │       │       ErrorPageConfig.java		//错误页面配置
│   │       │       ~~IpConfiguration.java~~		//已废弃ip过滤器
│   │       │       MyWebMvcConfig.java		//fastjson和跨域访问配置
│   │       │       SessionConfiguration.java		//登录拦截器入口
│   │       │       SessionInterceptor.java		//登录拦截器
│   │       │       
│   │       ├───controller		//接口声明与接收和返回数据
│   │       │       ExaminerController.java		//一些和订单审查有关的接口
│   │       │       PageRouterController.java		//静态页面路由的接口
│   │       │       ProducerController.java		//有关工厂的的一些接口
│   │       │       StockController.java		//有关库存的一些接口
│   │       │       UserBasicController.java		//管理员通常使用的接口
│   │       │       ~~UserManagementController.java~~		//已废弃
│   │       │       WorkShopController.java			//有关工厂账号操作的一些接口
│   │       │       
│   │       ├───mapper		//mybatis具体实现
│   │       │       CustomerAddressMapper.java		//定义CustomerAddress表的数据库操作
│   │       │       CustomerAddressMapper.xml		
│   │       │       CustomerConsignmentMapper.java		//定义CustomerConsignment表的数据库操作
│   │       │       CustomerConsignmentMapper.xml
│   │       │       CustomerMapper.java		//定义Customer表的数据库操作
│   │       │       CustomerMapper.xml
│   │       │       GoodsMapper.java		//定义Goods表的数据库操作
│   │       │       GoodsMapper.xml
│   │       │       GoodsOrderMapper.java		//定义GoodsOrder表的数据库操作
│   │       │       GoodsOrderMapper.xml
│   │       │       MySessionMapper.java		//定义MySession表的数据库操作
│   │       │       MySessionMapper.xml
│   │       │       OrderGoodsMapper.java		//定义OrderGoods表的数据库操作
│   │       │       OrderGoodsMapper.xml
│   │       │       StockMapper.java		//定义Stock表的数据库操作
│   │       │       StockMapper.xml
│   │       │       UserMapper.java		//定义User表的数据库操作
│   │       │       UserMapper.xml
│   │       │       WorkShopMapper.java		//定义WorkShop表的数据库操作
│   │       │       WorkShopMapper.xml
│   │       │       
│   │       ├───pojo		//数据库表对应的实体
│   │       │       Customer.java
│   │       │       CustomerAddress.java
│   │       │       CustomerConsignment.java
│   │       │       Goods.java
│   │       │       GoodsOrder.java
│   │       │       MySession.java
│   │       │       OrderGoods.java
│   │       │       Stock.java
│   │       │       User.java
│   │       │       UserMake.java
│   │       │       WorkShop.java
│   │       │       
│   │       ├───service		//数据罗技处理层
│   │       │   │   CustomerService.java		
│   │       │   │   UserService.java
│   │       │   │   WorkShopService.java
│   │       │   │   
│   │       │   └───impl		//逻辑处理层接口
│   │       │           CustomerServiceImpl.java
│   │       │           UserServiceImpl.java
│   │       │           WorkShopServiceImpl.java
│   │       │           
│   │       └───tools		//一些通用的工具类
│   │               DaoIf.java
│   │               DataMethod.java
│   │               
│   └───META-INF
│           MANIFEST.MF
│           
└───resources		//springboot配置文件
    │   application.properties
    │   
    ├───pages		//thymeleaf页面
    │       404.html
    │       500.html
    │       footer.html
    │       form-customer-address-input-02.html
    │       form-customer-basic-input.html
    │       form-customer-consignment-input.html
    │       form-order-input.html
    │       from-goods-add-buy.html
    │       header-normal.html
    │       header-super.html
    │       index-workshop.html
    │       index.html
    │       page-login-workshop.html
    │       page-login.html
    │       page-register.html
    │       page-search-order.html
    │       page-workshop-register.html
    │       test.html
    │       
    ├───static
    │   ├───css
    │   │       style.css
    │   │       
    │   ├───icons
    │   │   ├───avasta
    │   │   │   ├───css
    │   │   │   │       style.css
    │   │   │   │       
    │   │   │   └───fonts
    │   │   │           avasta.eot
    │   │   │           avasta.svg
    │   │   │           avasta.ttf
    │   │   │           avasta.woff
    │   │   │           avasta.woff2
    │   │   │           
    │   │   ├───flaticon
    │   │   │       flaticon.css
    │   │   │       Flaticon.eot
    │   │   │       Flaticon.ttf
    │   │   │       Flaticon.woff
    │   │   │       
    │   │   ├───font-awesome-old
    │   │   │   ├───css
    │   │   │   │       font-awesome.min.css
    │   │   │   │       
    │   │   │   └───fonts
    │   │   │           fontawesome-webfont3e6e.eot
    │   │   │           fontawesome-webfont3e6e.svg
    │   │   │           fontawesome-webfont3e6e.ttf
    │   │   │           fontawesome-webfont3e6e.woff
    │   │   │           fontawesome-webfont3e6e.woff2
    │   │   │           fontawesome-webfontd41d.eot
    │   │   │           
    │   │   ├───line-awesome
    │   │   │   ├───css
    │   │   │   │       line-awesome.min.css
    │   │   │   │       
    │   │   │   └───fonts
    │   │   │           la-brands-400.eot
    │   │   │           la-brands-400.svg
    │   │   │           la-brands-400.ttf
    │   │   │           la-brands-400.woff
    │   │   │           la-brands-400.woff2
    │   │   │           la-regular-400.eot
    │   │   │           la-regular-400.svg
    │   │   │           la-regular-400.ttf
    │   │   │           la-regular-400.woff
    │   │   │           la-regular-400.woff2
    │   │   │           la-solid-900.eot
    │   │   │           la-solid-900.svg
    │   │   │           la-solid-900.ttf
    │   │   │           la-solid-900.woff
    │   │   │           la-solid-900.woff2
    │   │   │           
    │   │   ├───material-design-iconic-font
    │   │   │   ├───css
    │   │   │   │       materialdesignicons.min.css
    │   │   │   │       
    │   │   │   └───fonts
    │   │   │           materialdesignicons-webfont.eot
    │   │   │           materialdesignicons-webfont.svg
    │   │   │           materialdesignicons-webfont.ttf
    │   │   │           materialdesignicons-webfont.woff
    │   │   │           materialdesignicons-webfont.woff2
    │   │   │           
    │   │   ├───simple-line-icons
    │   │   │   ├───css
    │   │   │   │       simple-line-icons.css
    │   │   │   │       
    │   │   │   └───fonts
    │   │   │           Simple-Line-Iconsd41d.eot
    │   │   │           
    │   │   └───themify-icons
    │   │       ├───css
    │   │       │       themify-icons.css
    │   │       │       
    │   │       └───fonts
    │   │               themify.ttf
    │   │               themify.woff
    │   │               themifyd41d.eot
    │   │               
    │   ├───images
    │   │   │   1.jpg
    │   │   │   dots.png
    │   │   │   dots2.png
    │   │   │   favicon.png
    │   │   │   hill.jpg
    │   │   │   like.png
    │   │   │   logo-full1.png
    │   │   │   logo-text1.png
    │   │   │   logo.png
    │   │   │   qr.png
    │   │   │   
    │   │   ├───avatar
    │   │   │       1.jpg
    │   │   │       1.png
    │   │   │       2.jpg
    │   │   │       3.jpg
    │   │   │       4.jpg
    │   │   │       5.jpg
    │   │   │       5.png
    │   │   │       6.jpg
    │   │   │       7.jpg
    │   │   │       8.jpg
    │   │   │       
    │   │   ├───big
    │   │   │       img1.jpg
    │   │   │       img2.jpg
    │   │   │       img3.jpg
    │   │   │       img4.jpg
    │   │   │       img5.jpg
    │   │   │       img6.jpg
    │   │   │       img7.jpg
    │   │   │       img8.jpg
    │   │   │       
    │   │   ├───body
    │   │   ├───card
    │   │   │       1.png
    │   │   │       2.png
    │   │   │       3.png
    │   │   │       
    │   │   ├───events
    │   │   │       1.png
    │   │   │       2.png
    │   │   │       3.png
    │   │   │       
    │   │   ├───product
    │   │   │       1.jpg
    │   │   │       2.jpg
    │   │   │       3.jpg
    │   │   │       4.jpg
    │   │   │       5.jpg
    │   │   │       6.jpg
    │   │   │       7.jpg
    │   │   │       
    │   │   ├───profile
    │   │   │   │   1.jpg
    │   │   │   │   17.jpg
    │   │   │   │   2.jpg
    │   │   │   │   20.jpg
    │   │   │   │   21.jpg
    │   │   │   │   22.jpg
    │   │   │   │   23.jpg
    │   │   │   │   24.jpg
    │   │   │   │   3.jpg
    │   │   │   │   4.jpg
    │   │   │   │   5.jpg
    │   │   │   │   6.jpg
    │   │   │   │   7.jpg
    │   │   │   │   8.jpg
    │   │   │   │   9.jpg
    │   │   │   │   cover.jpg
    │   │   │   │   profile.png
    │   │   │   │   
    │   │   │   └───small
    │   │   │           pic1.jpg
    │   │   │           pic10.jpg
    │   │   │           pic2.jpg
    │   │   │           pic3.jpg
    │   │   │           pic4.jpg
    │   │   │           pic5.jpg
    │   │   │           pic6.jpg
    │   │   │           pic7.jpg
    │   │   │           pic8.jpg
    │   │   │           pic9.jpg
    │   │   │           
    │   │   ├───svg
    │   │   └───tab
    │   │           1.jpg
    │   │           2.jpg
    │   │           3.jpg
    │   │           4.jpg
    │   │           
    │   ├───js
    │   │   │   custom.min.js
    │   │   │   deznav-init.js
    │   │   │   jquery-3.5.0.min.js
    │   │   │   
    │   │   ├───assets
    │   │   │   └───images
    │   │   ├───control		// # 非常重要的js文件
    │   │   │   │   common.js		//公共接收后端服务器的js
    │   │   │   │   loadhtml.js	//无敌重要的js，所有动态获取的html全部来源于他，也是本次编写代码的失误最大的地方
    │   │   │   │   login.js
    │   │   │   │   loginworkshop.js
    │   │   │   │   register.js
    │   │   │   │   
    │   │   │   ├───user
    │   │   │   │       user.js
    │   │   │   │       
    │   │   │   └───workshop
    │   │   │           workshoprote.js
    │   │   │           
    │   │   ├───dashboard
    │   │   │       analytics.js
    │   │   │       dashboard-1.js
    │   │   │       event-detail.js
    │   │   │       
    │   │   └───plugins-init
    │   │           bs-daterange-picker-init.js
    │   │           chartist-init.js
    │   │           chartjs-init.js
    │   │           clock-picker-init.js
    │   │           datatables.init.js
    │   │           flot-init.js
    │   │           fullcalendar-init.js
    │   │           jquery-asColorPicker.init.js
    │   │           jquery.validate-init.js
    │   │           jqvmap-init.js
    │   │           material-date-picker-init.js
    │   │           morris-init.js
    │   │           nestable-init.js
    │   │           nouislider-init.js
    │   │           pickadate-init.js
    │   │           piety-init.js
    │   │           select2-init.js
    │   │           sparkline-init.js
    │   │           summernote-init.js
    │   │           sweetalert.init.js
    │   │           toastr-init.js
    │   │           widgets-script-init.js
    │   │           
    │   └───vendor
    │       ├───animate
    │       │       animate.min.css
    │       │       
    │       ├───aos
    │       │   └───css
    │       │           aos.min.css
    │       │           
    │       ├───apexchart
    │       │       apexchart.js
    │       │       
    │       ├───bootstrap-daterangepicker
    │       │       daterangepicker.css
    │       │       daterangepicker.js
    │       │       
    │       ├───bootstrap-material-datetimepicker
    │       │   ├───css
    │       │   │       bootstrap-material-datetimepicker.css
    │       │   │       
    │       │   └───js
    │       │           bootstrap-material-datetimepicker.js
    │       │           
    │       ├───bootstrap-select
    │       │   └───dist
    │       │       ├───css
    │       │       │       bootstrap-select.min.css
    │       │       │       
    │       │       └───js
    │       │               bootstrap-select.min.js
    │       │               
    │       ├───chart.js
    │       │       Chart.bundle.min.js
    │       │       
    │       ├───chartist
    │       │   ├───css
    │       │   │       chartist.min.css
    │       │   │       
    │       │   └───js
    │       │           chartist.min.js
    │       │           
    │       ├───chartist-plugin-tooltips
    │       │   └───js
    │       │           chartist-plugin-tooltip.min.js
    │       │           
    │       ├───clockpicker
    │       │   ├───css
    │       │   │       bootstrap-clockpicker.min.css
    │       │   │       
    │       │   └───js
    │       │           bootstrap-clockpicker.min.js
    │       │           
    │       ├───datatables
    │       │   ├───css
    │       │   │       jquery.dataTables.min.css
    │       │   │       
    │       │   ├───images
    │       │   │       sort_asc.png
    │       │   │       sort_asc_disabled.png
    │       │   │       sort_both.png
    │       │   │       sort_desc.png
    │       │   │       sort_desc_disabled.png
    │       │   │       
    │       │   └───js
    │       │           jquery.dataTables.min.js
    │       │           
    │       ├───dropzone
    │       │   └───dist
    │       │           dropzone.css
    │       │           dropzone.js
    │       │           
    │       ├───flot
    │       │       jquery.flot.js
    │       │       jquery.flot.pie.js
    │       │       jquery.flot.resize.js
    │       │       
    │       ├───flot-spline
    │       │       jquery.flot.spline.min.js
    │       │       
    │       ├───fullcalendar
    │       │   ├───css
    │       │   │       fullcalendar.min.css
    │       │   │       
    │       │   └───js
    │       │           fullcalendar.min.js
    │       │           
    │       ├───global
    │       │       global.min.js
    │       │       
    │       ├───highlightjs
    │       │       highlight.pack.min.js
    │       │       
    │       ├───jquery-asColor
    │       │       jquery-asColor.min.js
    │       │       
    │       ├───jquery-asColorPicker
    │       │   ├───css
    │       │   │       asColorPicker.min.css
    │       │   │       
    │       │   ├───images
    │       │   │       alpha.png
    │       │   │       hue.png
    │       │   │       saturation.png
    │       │   │       transparent.png
    │       │   │       
    │       │   └───js
    │       │           jquery-asColorPicker.min.js
    │       │           
    │       ├───jquery-asGradient
    │       │       jquery-asGradient.min.js
    │       │       
    │       ├───jquery-smartwizard
    │       │   └───dist
    │       │       ├───css
    │       │       │       smart_wizard.min.css
    │       │       │       
    │       │       └───js
    │       │               jquery.smartWizard.js
    │       │               
    │       ├───jquery-sparkline
    │       │       jquery.sparkline.min.js
    │       │       
    │       ├───jquery-steps
    │       │   └───build
    │       │           jquery.steps.min.js
    │       │           
    │       ├───jquery-validation
    │       │       jquery.validate.min.js
    │       │       
    │       ├───jqueryui
    │       │   └───js
    │       │           jquery-ui.min.js
    │       │           
    │       ├───jqvmap
    │       │   ├───css
    │       │   │       jqvmap.min.css
    │       │   │       
    │       │   └───js
    │       │           jquery.vmap.min.js
    │       │           jquery.vmap.usa.js
    │       │           jquery.vmap.world.js
    │       │           
    │       ├───lightgallery
    │       │   ├───css
    │       │   │       lightgallery.min.css
    │       │   │       
    │       │   ├───fonts
    │       │   │       lg.eot
    │       │   │       lg.eot縩1z373.eot
    │       │   │       lg.svg縩1z373.svg
    │       │   │       lg.ttf縩1z373.ttf
    │       │   │       lg.woff縩1z373.woff
    │       │   │       
    │       │   ├───img
    │       │   │       loading.gif
    │       │   │       video-play.png
    │       │   │       vimeo-play.png
    │       │   │       youtube-play.png
    │       │   │       
    │       │   └───js
    │       │           lightgallery-all.min.js
    │       │           
    │       ├───metismenu
    │       │   └───css
    │       │           metisMenu.min.css
    │       │           
    │       ├───moment
    │       │       moment.min.js
    │       │       
    │       ├───morris
    │       │       morris.min.js
    │       │       raphael-min.js
    │       │       
    │       ├───nestable2
    │       │   ├───css
    │       │   │       jquery.nestable.min.css
    │       │   │       
    │       │   └───js
    │       │           jquery.nestable.min.js
    │       │           
    │       ├───nouislider
    │       │       nouislider.min.css
    │       │       nouislider.min.js
    │       │       
    │       ├───owl-carousel
    │       │       owl.carousel.css
    │       │       owl.carousel.js
    │       │       
    │       ├───peity
    │       │       jquery.peity.min.js
    │       │       
    │       ├───perfect-scrollbar
    │       │   └───css
    │       │           perfect-scrollbar.css
    │       │           
    │       ├───pickadate
    │       │   │   picker.date.js
    │       │   │   picker.js
    │       │   │   picker.time.js
    │       │   │   
    │       │   └───themes
    │       │           default.css
    │       │           default.date.css
    │       │           
    │       ├───select2
    │       │   ├───css
    │       │   │       select2.min.css
    │       │   │       
    │       │   └───js
    │       │           select2.full.min.js
    │       │           
    │       ├───star-rating
    │       │       jquery.star-rating-svg.js
    │       │       star-rating-svg.css
    │       │       
    │       ├───summernote
    │       │   │   summernote.css
    │       │   │   
    │       │   ├───font
    │       │   │       summernote.eot
    │       │   │       summernote.ttf
    │       │   │       summernote.woff
    │       │   │       summernote.woff2
    │       │   │       
    │       │   └───js
    │       │           summernote.min.js
    │       │           
    │       ├───sweetalert2
    │       │   └───dist
    │       │           sweetalert2.min.css
    │       │           sweetalert2.min.js
    │       │           
    │       ├───toastr
    │       │   ├───css
    │       │   │       toastr.min.css
    │       │   │       
    │       │   └───js
    │       │           toastr.min.js
    │       │           
    │       └───wnumb
    │               wNumb.js
    │               
    └───templates
        └───error

###########V1.0.0 版本内容更新

1. 新功能     实现了用户注册、注册客户、管理客户、编辑产品，统计收支、管理账号、订单流转功能。