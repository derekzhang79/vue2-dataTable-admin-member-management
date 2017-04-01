<template lang="html">
  <div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner">
      <!-- BEGIN LOGO -->
      <div class="page-logo">
        <a href="#/"><img src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/xk_logo.png" alt="logo" class="logo-default"> </a>
        <div class="menu-toggler sidebar-toggler"><span class="icon iconfont" @click="OpenShrinkMenu" >&#xe63b;</span></div>
      </div>
      <!--  -->
      <div class="page-toolbar">
        <div class="menu-toolbar"><a href="javascript:history.go(-1);" class="icon iconfont">&#xe635;</a></div>
        <div class="menu-toolbar"><a href="javascript:history.go(1);" class="icon iconfont">&#xe635;</a></div>
        <div class="menu-toolbar"><a href="javascript:history.go(0);" class="icon iconfont" @click="clearQueryCache">&#xe657;</a></div>
      </div>
      <!--  -->
      <div class="top-menu">
        <ul class="nav navbar-nav pull-right">
          <li class="dropdown">
            <a href="" class="dropdown-toggle"><span class="icon iconfont letter-icon">&#xe627;</span><span class="words word">欢迎您</span></a>
          </li>
          <li class="dropdown user-block">
            <!-- <a href="" class="dropdown-toggle">
                                <img alt="" class="img-circle" src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/avatar3_small.jpg">
                                <span class="username"> Nick </span>
                                <i class="icon iconfont">&#xe636;</i>
                            </a> -->
            <a href="#" class="dropdown-toggle"><img alt="" class="img-circle" src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/avatar3_small.jpg">
              <span class="words"> {{userLogin}} </span><i class="fa fa-angle-down icon iconfont">&#xe62c;</i></a>
              <ul class="user_option_menu">
                <li @click="execLogout">退出</li>
              </ul>
          </li>
          <!-- <li class="dropdown">
            <a href="" class="dropdown-toggle"><i class="icon-calendar icon iconfont quit-icon">&#xe888;</i></a>
          </li> -->
        </ul>
      </div>
      <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
  </div>
</template>

<script>
import menu from '../menu/menu.vue'
import coupon_add from '../main/coupon_add.vue'
export default {
    data() {
        return {
            userData: {}, // user对象
            userLogin: '', // user用户名
            showOpenMenu: true
        }
    },
    methods: {
        execLogout() {
            sessionStorage.removeItem( 'user_id' )
            sessionStorage.removeItem( 'user_data' )
            if ( sessionStorage.getItem( 'user_id' ) == null && sessionStorage.getItem( 'user_data' ) == null ) {
                this.$emit( 'exec-logout' )
                this.$router.replace( {
                    name: 'login'
                } )
            }
        },
        OpenShrinkMenu() {
            // this.showOpenMenu = !this.showOpenMenu
            if ( jQuery( '.page-sidebar' ).hasClass( 'page-sidebar-closed' ) ||
                jQuery( '.page-content' ).hasClass( 'page-content-closed' ) ) {
                jQuery( '.page-sidebar' ).removeClass( 'page-sidebar-closed' );
                jQuery( '.page-content' ).removeClass( 'page-content-closed' );
                 jQuery('.release span:eq(0)').css('left','27%')
                jQuery('.release span:eq(1)').css('left','48%')
                jQuery( '#accordion' ).show()
                jQuery( '.page-sidebar-menushrink' ).hide()
                this.$emit( 'show-menushirink', false )
            } else {
                jQuery( '.page-sidebar' ).addClass( 'page-sidebar-closed' );
                jQuery( '.page-content' ).addClass( 'page-content-closed' );
                // jQuery('.release span:eq(0)').css('left','35%')
                jQuery('.release span:eq(0)').css('left','30%')
                jQuery('.release span:eq(1)').css('left','57%')
                jQuery( '#accordion' ).hide()
                jQuery( '.page-sidebar-menushrink' ).show()
                this.$emit( 'show-menushirink', true )
            }
        },
        clearQueryCache() {
            if ( sessionStorage.getItem( 'dataTable_stateSave' ) ) {
                sessionStorage.removeItem( 'dataTable_stateSave' )
            }
            this.$router.replace( {
                path: this.$route.path
            } )
        }
    },
    created() {
        this.userData = JSON.parse( sessionStorage.getItem( 'user_data' ) ) || {}
        this.userLogin = this.userData.user_login
    }
};
</script>

<style lang="css">
  /**
   * 用户选项菜单
   */
 li.user-block:hover>a:hover{
   /*background:#b63b4d;*/
 }
 li.user-block>a:visited{
   background:#E94C3B;
 }
 .user-block:hover>ul{
   display: block;
 }
.user_option_menu{
  text-align: center;
  line-height: 30px;
  background:#E94C3B;
  color:#fff;
  display: none;
}
.user_option_menu li:hover{
  background:#e21818;
  cursor:pointer;
}
.navbar-nav>li>a {
    line-height: 23px;
}
  /*左边*/
.page-header.navbar {
    width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    height:1rem;
    filter: none;
    background-image: none;
    z-index: 9995;
    background-color: #E94C3B;
}
.navbar-fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
}
.page-logo {
    float: left;
    display: block;
    width: 235px;
    height: 54px;
    padding-left: 20px;
    padding-right: 20px;
}
.page-logo img{
  width:15%;
  border-radius: 50%;
}
img {
    vertical-align: middle;
}
.logo-default {
    margin: 0.25rem 0 0;
}
a {
  text-shadow: none;
  color: #337ab7;
}
/*工具栏*/

.page-toolbar {
  float: left;
  display: block;
  width: 200px;
  height: 54px;
  padding-left: 20px;
  padding-right: 20px;
}
.menu-toolbar{
  float: left;
  margin: 9px 8px 0;
  color:#fff;
  cursor: pointer;
}
.menu-toolbar:nth-child(1){
  -webkit-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  margin: 6.5px 8px 0;
}
.menu-toolbar:nth-child(3){
  margin-top:9px;
}
.page-toolbar a{
  text-decoration: none;
  color:#fff;
  font-size:24px;
}
/**/
.menu-toggler>span{
  color:#fff;
  font-size: 22px;
}
.menu-toggler>span:after,.menu-toggler>span:before {
    display: inline-block;
    width: 19px;
    height: 1px;
    position: relative;
    top: -6px;
    transition: all ease .3s;
}
.menu-toggler {
    cursor: pointer;
    opacity: .7;
    filter: alpha(opacity=70);
    display: block;
    -webkit-transition: opacity .3s;
    -moz-transition: opacity .3s;
    -ms-transition: opacity .3s;
    -o-transition: opacity .3s;
    transition: opacity .3s;
}
.page-header.navbar .menu-toggler.sidebar-toggler {
    float: right;
    margin: 13.5px 0 0;
    /*font-weight: 700;*/
}
/*头部右边导航*/
  .top-menu {
    margin: 0;
    padding: 0;
    float: right;
}
.top-menu .dropdown a:hover{
  background-color: #e21818;
}
.navbar-nav {
    padding: 0;
    margin-right: 30px;
    display: block;
}
.pull-right {
    float: right!important;
}
.navbar-nav>li.dropdown {
    margin: 0;
    padding: 0 5px;
    height: 1rem;
    display: inline-block;
}
.navbar-nav>li.dropdown .icon{
  color: #fff;
  /*vertical-align: middle;*/
}
.dropdown-toggle>img {
    float: left;
    margin-top: -2px;
    margin-right: 5px;
    height: 29px;
    display: inline-block;
}
.dropdown-toggle{
    /*background-color: #3f4f62;*/
    padding: 16px 6px 13px 8px;
}
.img-circle{
    border-radius: 50%!important;
}
.words{
    display: inline-block;
    font-size: 13px;
    font-weight: 300;
    color:#fff;
}
.word{
  vertical-align: middle;
  margin-left: 3px;
}
.letter-icon{
    top:4px;
    position:relative;
}
.user-icon{
    font-size:14px;
}
.quit-icon{
    top:2px;
    position:relative;
}
</style>
