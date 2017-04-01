<template lang="html">
  <div id="app">
  <div v-if="isUserLogin" class="page-wrapper">
    <v-header @exec-logout="execLogout" @show-menushirink="isShowMenushirink"></v-header>
    <div class="page-container">
      <v-menu></v-menu>
      <!-- <v-main></v-main> -->
      <router-view name="main" :menushirink-status="menushirinkShow"></router-view>
    </div>
  </div>
  <div v-else class="login-page-wrapper">
    <router-view name="login" @exec-login="execLogin"></router-view>
  </div>
</div>
</template>

<script>
import header from './components/header/header.vue'
import menu from './components/menu/menu.vue'
import home from './components/main/home.vue'
export default {
    name: 'app', // 默认作为组件的标签名
    data() {
        return {
            isLogin: false, // 必须要初始定义,它的变化会影响isUserLogin的变化
            menushirinkShow: false, // 是否显示收缩的菜单栏
        }
    },
    computed: {
        isUserLogin() {
            if ( this.isLogin == true ) {
                return true
            } else {
                return false
            }
        }
    },
    components: {
        'v-header': header,
        'v-menu': menu,
        'v-main': home
    },
    methods: {
        execLogin( val ) {
            this.isLogin = val
            this.$router.replace( {
                name: 'home'
            } )
        },
        execLogout() {
            this.isLogin = false
        },
        // 是否显示收缩的菜单栏
        isShowMenushirink( val ) {
            this.menushirinkShow = val
        }
    },
    created() {
        // 这个判断主要防止重新刷新主页使this.isLogin 恒等于 false,导致用户登录状态错误，如果在nw中应该不存在这个问题
        if ( sessionStorage.getItem( 'user_id' ) > 0 ) {
            this.isLogin = true
        }
        // 初始进入主页时判断用户是否登录
        if ( this.isUserLogin == false ) {
            this.$router.replace( {
                name: 'login'
            } )
        }

        // 这里执行整个项目需要实时变更的数据
        let currentTimeStamp = parseInt(new Date().getTime()/1000)
        let memberLogUndoUpdate = JSON.parse(localStorage.getItem('timing_exec_member_log_undo_update')) || {}
        if(JSON.stringify(memberLogUndoUpdate) == '{}' || memberLogUndoUpdate<currentTimeStamp){
          jQuery.ajax( {
              url: 'http://pw.demo.kaensoft.com/rest-api/api-json/xkhy/v2/timing_exec',
              type: 'POST',
              data: {
                  exec_member_log_undo_update: true, // 执行member_log撤销更新，超过24小时不可进行撤销
              },
              success: function( res ) {
                // 每1个小时去执行更新动作
                let nextUpdateTimeStamp = parseInt(new Date().getTime()/1000) + parseInt(1*3600)
                localStorage.setItem('timing_exec_member_log_undo_update',JSON.stringify(nextUpdateTimeStamp))
              }
          } );
        }

        let couponExpiryUpdate = JSON.parse(localStorage.getItem('timing_exec_coupon_expiry_update')) || {}
        if(JSON.stringify(couponExpiryUpdate) == '{}' || couponExpiryUpdate<currentTimeStamp){
          jQuery.ajax( {
              url: 'http://pw.demo.kaensoft.com/rest-api/api-json/xkhy/v2/timing_exec',
              type: 'POST',
              data: {
                  exec_coupon_expiry_update: true, // 执行coupon和userCoupon是否过期更新
              },
              success: function( res ) {
                // 每3个小时去执行更新动作
                let nextUpdateTimeStamp = parseInt(new Date().getTime()/1000) + parseInt(3*3600)
                localStorage.setItem('timing_exec_coupon_expiry_update',JSON.stringify(nextUpdateTimeStamp))
              }
          } );
        }


    },
}
</script>

<style lang="css">
  *{
  margin:0;
  padding:0;
  }
  html,body{
    width:100%;
    height:100%;
    font-family: "微软雅黑",arial;
      /*font-family: "Open Sans",sans-serif;*/
      background-color: #404348;
  }
   /* project id 153203 */
  /*@font-face {
	  font-family: 'iconfont';
	  src: url('//at.alicdn.com/t/font_h3lqqhdu6t0m5cdi.eot');
	  src: url('//at.alicdn.com/t/font_h3lqqhdu6t0m5cdi.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_h3lqqhdu6t0m5cdi.woff') format('woff'),
	  url('//at.alicdn.com/t/font_h3lqqhdu6t0m5cdi.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_h3lqqhdu6t0m5cdi.svg#iconfont') format('svg');
  }
  .iconfont{
      font-family:"iconfont" !important;
      font-size:24px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
  }
  .icon{
      color:#fff;
  }*/

  /*app容器区域*/
  #app{
    height:100%;
  }

  /*login页面容器区域*/
  .login-page-wrapper{
    width: 100%;
    height: 100%;
    background:url('http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/03/xkhy_login.jpg');
    background-size: 100% 100%;
  }
</style>
>
