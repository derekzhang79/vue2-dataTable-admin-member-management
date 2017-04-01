<template lang="html">
  <div class="page-sidebar-wrapper">
    <div class="page-sidebar">
      <ul id="accordion" class="accordion" name="accordion">
        <li class="">
          <div class="page-shop">
            <div class="shop-logo"><img src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/xk_logo.png"></div>
            <div class="shop-name">{{sellerInfo.sellerName}}</div>
          </div>
        </li>
        <li class="page-homepage public-home">
            <a href="#/">
            <div class="link" ><i class="fa fa-code icon iconfont">&#xe612;</i>主页<i class="fa-chevron-down home-icon icon iconfont">&#xe62c;</i></div>
            </a>
          <ul class="submenu" style=""></ul>
        </li>
        <li class="page-operatepage public-home">
          <div class="link"><i class="fa fa-code icon iconfont">&#xe66a;</i>操作台<i class="fa fa-chevron-down icon iconfont">&#xe62c;</i></div>
          <ul class="submenu operateMenu" style="">
            <!-- <li><a href="operating_home.html">操作台</a></li> -->
            <li><router-link to="/operating_home">操作台</router-link></li>
          </ul>
        </li>
        <li class="page-memberpage public-home">
          <div class="link"><i class="fa fa-mobile icon iconfont">&#xe770;</i>会员管理<i class="fa fa-chevron-down icon iconfont">&#xe62c;</i></div>
          <ul class="submenu memberMenu" style="">
            <!-- <li><a href="management.html">会员管理</a></li> -->
            <li><router-link to="/member_home">会员管理</router-link></li>
            <!-- <li><router-link to="/member_personalCenter">个人中心</router-link></li> -->
          </ul>
        </li>
        <li class="page-couponpage public-home">
          <div class="link"><i class="fa fa-globe icon iconfont">&#xe69b;</i>优惠券管理<i class="fa fa-chevron-down icon iconfont">&#xe62c;</i></div>
          <ul class="submenu couponMenu" style="">
            <li><router-link to="/coupon_home">优惠券</router-link></li>
          </ul>
        </li>
        <!--
        服务模块暂时先不开放
        <li>
          <div class="link"><i class="fa fa-globe icon iconfont">&#xe612;</i>服务管理<i class="fa fa-chevron-down icon iconfont">&#xe62c;</i></div>
          <ul class="submenu" style="">
            <li><router-link to="/backstage_service">服务管理</router-link></li>
          </ul>
        </li>
        -->
      </ul>
      <!--  -->
      <ul class="page-sidebar-menushrink" >
          <li style=""><a class="icon iconfont">&#xe612;</a>
              <ul class="page-hover-menu" style="">
                  <li @click="showMainPage('home')">主页</li>
              </ul>
          </li>
          <li style=""><a class="icon iconfont">&#xe66a;</a>
              <ul class="page-hover-menu" style="">
                  <li @click="showMainPage('operating')">操作台</li>
              </ul>
          </li>
          <li style=""><a class="icon iconfont">&#xe770;</a>
              <ul class="page-hover-menu" style="">
                 <li @click="showMainPage('member')">会员管理</li>
              </ul>
          </li>
          <li style=""><a class="icon iconfont">&#xe69b;</a>
              <ul class="page-hover-menu" style="">
                  <li @click="showMainPage('coupon')">优惠券管理</li>
              </ul>
          </li>
      </ul>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
          sellerInfo: {} // 商家基本信息
        }
    },
    methods: {
        showMainPage( val ) {
            if ( val === 'home' ) {
                this.$router.push( '/' )
            }
            if ( val === 'operating' ) {
                this.$router.push( '/operating_home' )
            }
            if ( val === 'member' ) {
                this.$router.push( '/member_home' )
            }
            if ( val === 'coupon' ) {
                this.$router.push( '/coupon_home' )
            }
        }
    },
    created() {
      let $this = this
      jQuery.ajax( {
          url: this.storageSiteUrl+'/api-json/xkhy/v2/seller',
          type: 'GET',
          data: {
            seller_info: true
          },
          success: function( res ) {
            $this.sellerInfo = res.data
          }
      } );
    },
    mounted() {
        var Accordion = function( el, multiple ) {
            this.el = el || {};
            this.multiple = multiple || false;
            // Variables privadas
            var links = this.el.find( '.link' );
            // Evento
            links.on( 'click', {
                el: this.el,
                multiple: this.multiple
            }, this.dropdown )
        }
        Accordion.prototype.dropdown = function( e ) {
            var $el = e.data.el;
            var $this = jQuery( this ),
                $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass( 'open' );
            if ( !e.data.multiple ) {
                $el.find( '.submenu' ).not( $next ).slideUp().parent().removeClass( 'open' );
            };
        }
        var accordion = new Accordion( jQuery( '#accordion' ), false ); // 这里不能使用#id选择器绑定事件(解决：id属性包含空格导致) by pw 2017.2.14
    }
}
</script>

<!-- 请不要给style加作用域，page-content样式在这里编写 by pengwei-->
<style lang="css">
 /*左边导航栏*/
ul {
     list-style-type: none;
 }

a {
    color: #b63b4d;
    text-decoration: none;
}
h1 {
    color: #FFF;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    margin-top: 80px;
 }
h1 a {
    color: #c12c42;
    font-size: 16px;
 }
.page-sidebar-wrapper{
  position:relative;
  z-index: 10000;
}
.accordion {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}
.accordion .link {
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #fff;
    font-size: 14px;
    border-bottom: 1px solid #3d4957;
    position: relative;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}
/*左边菜单栏大标题访问的时候改变颜色*/
.accordion .link:hover{
    background:#E94C3B;
}
.accordion li:last-child .link {
    border-bottom: 0;
}
.accordion li i {
    position: absolute;
    top: 14px;
    left: 12px;
    font-size: 18px;
    color: #fff;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}
.accordion li i.fa-chevron-down {
    right: 12px;
    left: auto;
    font-size: 16px;
}
/*左边菜单栏点击的时候变色*/
.accordion li.open .link {
    color: #fff;
    background:#E94C3B;
}
.accordion li.open i {
    color: #fff;
}
.accordion li.open i.fa-chevron-down {
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
/*** Submenu -----------------------------*/
 .submenu {
    display: none;
    background: #404348;
    font-size: 14px;
 }
 .submenu li {
    /*border-bottom: 1px solid #4b4a5e;*/
 }

 .submenu a {
    display: block;
    text-decoration: none;
    color: #fff;
    padding: 12px;
    padding-left: 60px;
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
 }
/*左边菜单栏小标题变色*/
 .submenu a:hover {
    background: #52555A;
    color: #FFF;
 }
 .page-homepage a{
    text-decoration: none;
 }
.page-home{
    background:#E94C3B;
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #d9d9d9;
    font-size: 14px;
    border-bottom: 1px solid #3d4957;
    position: relative;
}
.home-icon{
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
 /**/
.page-container{
    margin-top: 1rem;
    padding: 0;
    position: relative;
}
.page-sidebar,.page-sidebar:hover {
    background-color: #404348;
}
.page-content {
    background-color: #fff;
}
.page-shop{
    cursor: pointer;
    display: block;
    padding-top:0.6rem;
    padding-bottom:0.6rem;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-bottom: 1px solid #3d4957;
    position: relative;
}
.shop-logo{
    width: 235px;
    height: 50px;
}
.shop-logo img{
    width:20%;
    border-radius: 50%;
}

.shop-name{
    padding-top:5px;
}
@media screen and (min-width:768px) and (max-width:991px){
    .page-sidebar {
        width: 235px;
        float: left;
        position: fixed;
        margin-right: -100%;
    }
    .page-sidebar-closed{
        width: 45px !important;
    }
    .page-content-wrapper {
        float: left;
        width: 100%;
    }
    .page-content{
        min-height:280px;
        margin-left: 235px;
        margin-top: 0;
        padding: 25px 35px 10px;
    }
    .page-content-closed{
        margin-left:45px;
    }
}
@media screen and (min-width: 992px ) and (max-width:1400px){
    .page-sidebar {
        width: 235px;
        float: left;
        position: fixed;
        margin-right: -100%;
    }
    .page-sidebar-closed{
        width: 45px !important;
    }
    .page-content-wrapper {
        float: left;
        width: 100%;
    }
    .page-content {
        margin-left: 235px;
        margin-top: 0;
        min-height: 710px;
        padding: 25px 35px 10px;
    }
    .page-content-closed{
        margin-left:45px;
    }
}
@media (min-width:1400px){
    .page-sidebar {
            width: 235px;
            float: left;
            position: fixed;
            margin-right: -100%;
    }
    .page-sidebar-closed{
        width: 45px !important;
    }
    .page-content-wrapper {
        float: left;
        width: 100%;
    }
    .page-content{
        min-height:1112px;
        margin-left: 235px;
        margin-top: 0;
        padding: 25px 35px 10px;

    }
    .page-content-closed{
        margin-left:45px;
    }
}
 .page-bar {
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #dfdfdf;
    font-size:26px;
    font-weight:bolder;
}
/*收缩时候侧边导航栏样式*/
.page-sidebar-menushrink{
    display: none;
    margin-top:142px;
    padding:0;
}
.page-sidebar-menushrink>li{
    position: relative;
    z-index: 9999;
    color:#fff;
    width:45px;
    text-align:center;
    height:53px;
    line-height:53px;
}
.page-sidebar-menushrink>li>a{
    color:#fff;
    text-decoration: none;
}
.page-hover-menu{
    /*display: none;
    float:left;
    margin-left:45px;
    margin-top:-53px;
    background-color:#E94C3B;
    width:100px;*/
    display: none;
}
.page-hover-menu>li{
    color:#fff;
}
/*.page-hover-menu>li>a{
    display: inline-block;
    width:100%;
    color:#fff;
    text-decoration: none;
}*/
.page-sidebar-menushrink>li:hover{
    background-color:#E94C3B;
    cursor: pointer;
}
.page-sidebar-menushrink>li:hover>.page-hover-menu{
    display: block;
    position: absolute;
    width:100px;
    margin-left:45px;
    margin-top:-53px;
    background-color: #404348;
}
.page-hover-menu>li:hover{
    background-color:#E94C3B;
}

</style>
